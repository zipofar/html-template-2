import { watch } from 'melanke-watchjs';

export default () => {
  const state = {
    addedToCard: [],
  };
  const elButtonsAddToCard = document.querySelectorAll('.popular-products button[action="addToCard"]');

  elButtonsAddToCard.forEach((e) => e.addEventListener('click', (el) => {
    const elBtn = el.target;
    const idProduct = elBtn.attributes['data-id'].value;
    if (state.addedToCard.includes(idProduct)) {
      return;
    }
    state.addedToCard.push(idProduct);
  }));

  watch(state, 'addedToCard', (prop, action, newvalue) => {
    const elButtonAddToCard = document.querySelector(`.popular-products button[action="addToCard"][data-id="${newvalue}"]`);
    elButtonAddToCard.classList.remove('btn-outline-primary');
    elButtonAddToCard.classList.add('btn-primary');
    elButtonAddToCard.innerHTML = '<span class="btn-sub-icon icon__check"></span> В КОРЗИНE';
  });
};
