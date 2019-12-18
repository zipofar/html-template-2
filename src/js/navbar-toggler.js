export default (classNameToggler = 'navbar-toggler') => {
  const elToggler = document.querySelector(`.${classNameToggler}`);
  const classNameNavbar = elToggler.getAttribute('for');
  const elNavbarWrapper = document.querySelector(`.${classNameNavbar}`);
  const elNavbar = elNavbarWrapper.firstChild;

  elToggler.addEventListener('click', () => {
    const heightNavbar = elNavbar.clientHeight;
    const isShow = elNavbarWrapper.classList.contains('show');
    if (isShow) {
      elNavbarWrapper.classList.remove('show');
      elNavbarWrapper.style.height = '';
    } else {
      elNavbarWrapper.classList.add('show');
      elNavbarWrapper.style.height = `calc(1rem + ${heightNavbar}px)`;
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target === elToggler) {
      return;
    }

    const isShow = elNavbarWrapper.classList.contains('show');
    if (isShow) {
      elNavbarWrapper.classList.remove('show');
      elNavbarWrapper.style.height = '';
    }
  });

};
