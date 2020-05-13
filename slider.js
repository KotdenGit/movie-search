
var mySwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal',
  height: 400,
  spaceBetween: 10,

  loop: false,
  slidesPerView: 4,
  observer: true,

  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    425: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 25
    },
    1020: {
      slidesPerView: 4,
      spaceBetween: 25
    },
  },
})
