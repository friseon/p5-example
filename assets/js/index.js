const buttonMenu = document.querySelector('.main-menu__button');
const menuList = document.querySelector('.main-menu_phone .main-menu__list');

buttonMenu.addEventListener('click', (event) => {
    menuList.classList.toggle('main-menu__list_hidden');
});