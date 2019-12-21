import { watch } from 'melanke-watchjs';

export default () => {
  const state = {
    addedToCart: [],
    totalInCart: 0,
  };
  const elButtonsAddToCart = document.querySelectorAll('.popular-products button[action="addToCart"]');
  const elTotalCart = document.getElementById('total-in-cart');

  elButtonsAddToCart.forEach((e) => e.addEventListener('click', (el) => {
    const elBtn = el.target;
    const idProduct = elBtn.attributes['data-id'].value;
    if (state.addedToCart.includes(idProduct)) {
      return;
    }
    state.addedToCart.push(idProduct);
    state.totalInCart += 1;
  }));

  watch(state, 'addedToCart', (prop, action, newvalue) => {
    const elButtonAddToCart = document.querySelector(`.popular-products button[action="addToCart"][data-id="${newvalue}"]`);
    elButtonAddToCart.classList.remove('btn-outline-primary');
    elButtonAddToCart.classList.add('btn-primary');
    elButtonAddToCart.innerHTML = '<span class="btn-sub-icon icon__check"></span> В КОРЗИНE';
  });

  watch(state, 'totalInCart', (prop, action, newvalue) => {
    elTotalCart.innerHTML = `(${newvalue})`;
  });
};
