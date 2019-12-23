import { watch } from 'melanke-watchjs';

const products = [
  {
    id: 1,
    markerIsNew: true,
    name: 'DAVIDOFF Urban Coolness Sunglasses',
    urlToImg: 'images/prod_01.png',
    newPrice: 14500,
    oldPrice: 15500,
    inCart: false,
  },
  {
    id: 2,
    markerIsNew: false,
    name: 'ACUVUE OASYS with HydraLuxe (30 линз)',
    urlToImg: 'images/prod_02.png',
    newPrice: 12500,
    oldPrice: 17500,
    inCart: false,
  },
  {
    id: 3,
    markerIsNew: false,
    name: 'BULGARI NV-2345 Sunglasses',
    urlToImg: 'images/prod_03.png',
    newPrice: 18500,
    inCart: true,
  },
  {
    id: 4,
    markerIsNew: true,
    name: 'DAVIDOFF Urban Coolness Sunglasses 2',
    urlToImg: 'images/prod_01.png',
    newPrice: 14500,
    oldPrice: 15500,
    inCart: false,
  },
];

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
    <div class="product-card">
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

const getProductsOnCart = (items) => { return items.filter((e) => (e.inCart === true)) };

export default () => {
  const state = {
    products,
    addedToCart: [...getProductsOnCart(products)],
    totalInCart: getProductsOnCart(products).length,
  };
  console.log(state)

  const htmlProducts = state.products.map(renderProductCard).join('');
  const elMountPopularProducrs = document.getElementById('mount-pop-products');
  elMountPopularProducrs.innerHTML = htmlProducts;

  const elButtonsAddToCart = document.querySelectorAll('.popular-products button[action="addToCart"]');
  const elTotalCart = document.getElementById('total-in-cart');
  elTotalCart.innerHTML = `(${state.totalInCart})`;

  elButtonsAddToCart.forEach((e) => e.addEventListener('click', (el) => {
    const elBtn = el.target;
    const idProduct = Number.parseInt(elBtn.attributes['data-id'].value);
    if (state.addedToCart.filter(({ id }) => (id === idProduct)).length > 0) {
      return;
    }
    state.addedToCart = [...state.addedToCart, state.products];
    state.totalInCart += 1;
  }));

  watch(state, 'addedToCart', (prop, action, newvalue, oldvalue) => {
    console.log(newvalue)
    const newProduct = newvalue[newvalue.length - 1];
    const elButtonAddToCart = document.querySelector(`.popular-products button[action="addToCart"][data-id="${newProduct.id}"]`);
    elButtonAddToCart.classList.remove('btn-outline-primary');
    elButtonAddToCart.classList.add('btn-primary');
    elButtonAddToCart.innerHTML = '<span class="btn-sub-icon icon__check"></span> В КОРЗИНE';
  });

  watch(state, 'totalInCart', (prop, action, newvalue) => {
    elTotalCart.innerHTML = `(${newvalue})`;
  });
};
