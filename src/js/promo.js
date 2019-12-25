import Swiper from 'swiper';

export default () => (new Swiper('.promo__item-right', {
  navigation: {
    nextEl: '.promo__swiper-btn-next',
    prevEl: '.promo__swiper-btn-prev',
  },
}));
