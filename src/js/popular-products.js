import { watch } from 'melanke-watchjs';
import Swiper from 'swiper';

const products = {
  1: {
    id: 1,
    markerIsNew: true,
    name: 'DAVIDOFF Urban Coolness Sunglasses',
    urlToImg: 'images/prod_01.png',
    newPrice: 14500,
    oldPrice: 15500,
    inCart: false,
  },
  2: {
    id: 2,
    markerIsNew: false,
    name: 'ACUVUE OASYS with HydraLuxe (30 линз)',
    urlToImg: 'images/prod_02.png',
    newPrice: 12500,
    oldPrice: 17500,
    inCart: false,
  },
  3: {
    id: 3,
    markerIsNew: false,
    name: 'BULGARI NV-2345 Sunglasses',
    urlToImg: 'images/prod_03.png',
    newPrice: 18500,
    inCart: true,
  },
  4: {
    id: 4,
    markerIsNew: true,
    name: 'DAVIDOFF Urban Coolness Sunglasses 2',
    urlToImg: 'images/prod_01.png',
    newPrice: 14500,
    oldPrice: 15500,
    inCart: false,
  },
};

const setSwiper = () => (
  new Swiper('.popular-products__cards-block',
    {
      slidesPerView: 1,
      navigation: {
        nextEl: '.popular-products__swiper-btn-next',
        prevEl: '.popular-products__swiper-btn-prev',
      },
      breakpoints: {
        992: {
          slidesPerView: 2,
        },
        1200: {
          slidesPerView: 3,
        },
        1470: {
          slidesPerView: 4,
        },
      },
    })
);

const renderProductCard = (props) => {
  const {
    markerIsNew,
    urlToImg,
    name,
    oldPrice,
    newPrice,
    inCart,
    id,
  } = props;

  return `
    <div class="product-card swiper-slide">
      <div class="product-card__image-wrapper">
        ${markerIsNew ? '<div class="product-card__marker">новинка</div>' : ''}
        <a href="#" class="product-card__image-link">
          <div class="product-card__image" style="background-image: url('${urlToImg}')"></div>
        </a>
      </div>
      <span class="product-card__description">${name}</span>
      <div class="product-card__price-block">
        <div class="product-card__prices">
          <span class="product-card__new-price">${newPrice} руб.</span>
          ${typeof oldPrice === 'undefined' ? '' : `<span class="product-card__old-price">${oldPrice} руб.</span>`}
        </div>
        <div class="product-card__btn-group">
          <button class="btn btn-outline-primary btn-icon">
            <span class="btn-fill-icon icon__compare"></span>
          </button>
          <button
            class="${inCart ? 'btn btn-primary' : 'btn btn-outline-primary'}"
            data-id='${id}'
            action="addToCart"
          >
            ${inCart ? '<span class="btn-sub-icon icon__check"></span>' : ''}
            ${inCart ? 'В КОРЗИНЕ' : 'В КОРЗИНУ'}
          </button>
        </div>
      </div>
    </div>
  `;
};

const getState = () => {
  const stateFromStorage = localStorage.getItem('state');
  if (stateFromStorage !== null) {
    return JSON.parse(stateFromStorage);
  }

  const state = {
    products,
    totalOnCart: Object.keys(products).filter((key) => products[key].inCart).length,
  };

  localStorage.setItem('state', JSON.stringify(state));
  return state;
};

export default () => {
  const state = getState();

  const elMountPopularProducrs = document.getElementById('mount-pop-products');
  const htmlProducts = Object
    .keys(state.products)
    .map((key) => (renderProductCard(state.products[key])))
    .join('');

  elMountPopularProducrs.innerHTML = htmlProducts;
  setSwiper();

  const elButtonsAddToCart = document.querySelectorAll('.popular-products button[action="addToCart"]');
  const elTotalCart = document.getElementById('total-in-cart');
  elTotalCart.innerHTML = `(${state.totalOnCart})`;

  elButtonsAddToCart.forEach((e) => e.addEventListener('click', (el) => {
    const elBtn = el.target;
    const productId = Number.parseInt(elBtn.attributes['data-id'].value, 10);
    const selectedProduct = state.products[productId];

    if (selectedProduct.inCart) {
      return;
    }

    state.products[productId] = { ...selectedProduct, inCart: true };
    state.totalOnCart += 1;
    localStorage.setItem('state', JSON.stringify(state));
  }));

  watch(state, 'products', (prop, action, newvalue) => {
    const elButtonAddToCart = document.querySelector(`.popular-products button[action="addToCart"][data-id="${newvalue.id}"]`);
    elButtonAddToCart.classList.remove('btn-outline-primary');
    elButtonAddToCart.classList.add('btn-primary');
    elButtonAddToCart.innerHTML = '<span class="btn-sub-icon icon__check"></span> В КОРЗИНE';
  });

  watch(state, 'totalOnCart', (prop, action, newvalue) => {
    elTotalCart.innerHTML = `(${newvalue})`;
  });
};
