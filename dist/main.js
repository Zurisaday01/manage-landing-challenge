"use strict";const swiper=new Swiper(".swiper-container",{direction:"horizontal",slidesPerView:3,spaceBetween:30,loop:!0,breakpoints:{300:{slidesPerView:1},870:{slidesPerView:2},1400:{slidesPerView:3}}}),alertEl=document.querySelector("#alert"),input=document.querySelector("#email"),btn=document.querySelector("#btn-validate"),btnNavEl=document.querySelector(".navigation__btn"),bgEl=document.querySelector(".container__bg");btn.addEventListener("click",(()=>{input.value&&/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input.value)?(alertEl.classList.add("hidden"),input.classList.remove("incorrect")):(alertEl.classList.remove("hidden"),input.classList.add("incorrect"))})),btnNavEl.addEventListener("click",(()=>{bgEl.classList.toggle("hidden")}));