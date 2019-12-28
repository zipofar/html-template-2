import Swiper from 'swiper';

export default () => (new Swiper('.promo__item-right', {
  navigation: {
    nextEl: '.promo__swiper-btn-next',
    prevEl: '.promo__swiper-btn-prev',
  },
  pagination: {
    el: '.carousel-controls',
    clickable: true,
    renderBullet: (_, className) => (
      `<span class="${className} carousel-controls__btn"></span>`
    ),
  },
}));
