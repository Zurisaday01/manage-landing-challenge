'use strict';
const swiper = new Swiper('.swiper-container', {
	// Optional parameters
	direction: 'horizontal',
	slidesPerView: 3,
	spaceBetween: 30,
	loop: true,
	breakpoints: {
		300: {
			slidesPerView: 1,
		},
		870: {
			slidesPerView: 2,
		},
		1400: {
			slidesPerView: 3,
		},
	},
});
// Validate email
const alertEl = document.querySelector('#alert');
const input = document.querySelector('#email');
const btn = document.querySelector('#btn-validate');
// Deploy nav
const btnNavEl = document.querySelector('.navigation__btn');
const bgEl = document.querySelector('.container__bg');

btn.addEventListener('click', () => {
	const emailRegex =
		/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
	//Empty o incorrect value
	if (!input.value || !emailRegex.test(input.value)) {
		alertEl.classList.remove('hidden');
		input.classList.add('incorrect');
	} else {
		alertEl.classList.add('hidden');
		input.classList.remove('incorrect');
	}
});

btnNavEl.addEventListener('click', () => {
	bgEl.classList.toggle('hidden');
});
