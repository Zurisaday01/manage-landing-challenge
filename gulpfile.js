const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const imageminPngquant = require('imagemin-pngquant');
const imageminZopfli = require('imagemin-zopfli');
const imageminMozjpeg = require('imagemin-mozjpeg'); //need to run 'brew install libpng'
const imageminGiflossy = require('imagemin-giflossy');

//Sass Task
function scssTask() {
	return src('src/scss/style.scss', { sourcemaps: true })
		.pipe(sass())
		.pipe(postcss([cssnano()]))
		.pipe(dest('dist', { sourcemaps: '.' }));
}

//JS Task
function jsTask() {
	return src('src/js/*.js')
		.pipe(terser())
		.pipe(dest('dist', { sourcemaps: '.' }));
}

//Browsersync Task
function browsersyncServe(cb) {
	browsersync.init({
		server: {
			baseDir: './dist',
		},
	});
	cb();
}

//Imagemin Task
function imageTask() {
	return src('src/img/*.{gif,png,jpg,svg}')
		.pipe(
			cache(
				imagemin([
					imageminPngquant({
						speed: 1,
						quality: [0.95, 1],
					}),
					imageminZopfli({
						more: true,
					}),

					imageminGiflossy({
						optimizationLevel: 3,
						optimize: 3,
						lossy: 2,
					}),
					//svg
					imagemin.svgo({
						plugins: [
							{
								removeViewBox: false,
							},
						],
					}),
					//jpg lossless
					imagemin.mozjpeg({
						progressive: true,
					}),
					//jpg very light lossy, use vs jpegtran
					imageminMozjpeg({
						quality: 90,
					}),
				])
			)
		)
		.pipe(dest('dist', { sourcemaps: '.' }));
}

function browsersyncReload(cb) {
	browsersync.reload();
	cb();
}

// Watch Task
function watchTask() {
	watch('*.html', browsersyncReload);
	watch(
		['src/scss/**/*.scss', 'src/js/**/*.js'],
		series(scssTask, jsTask, browsersyncReload)
	);
}

//Default Gulp Task
exports.default = series(
	scssTask,
	jsTask,
	browsersyncServe,
	watchTask,
	imageTask
);
