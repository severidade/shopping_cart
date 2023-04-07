// // Alvo
// const menuControlOpen = document.getElementById('shopping_cart');
// const menuControlClose = document.getElementById('shopping_cart_close');

// function toggleMenu() {
//   document.getElementById('cart').classList.toggle('active');
//   document.getElementsByTagName('body')[0].classList.toggle('boqueiaScroll');
// }

// // Escutadores
// menuControlOpen.addEventListener('click', toggleMenu);
// menuControlClose.addEventListener('click', toggleMenu);

document.querySelector('#shopping_cart').addEventListener('click', () => {
  document.querySelector('#cart').classList.toggle('active');
  document.body.classList.toggle('boqueiaScroll');
});

document.querySelector('#shopping_cart_close').addEventListener('click', () => {
  document.querySelector('#cart').classList.toggle('active');
  document.body.classList.toggle('boqueiaScroll');
});