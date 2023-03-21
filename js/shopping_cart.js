// Alvo
const menuControlOpen = document.getElementById('shopping_cart');
const menuControlClose = document.getElementById('shopping_cart_close');

function toggleMenu() {
  document.getElementById('cart').classList.toggle('active');
  document.getElementsByTagName('body')[0].classList.toggle('boqueiaScroll');
}

// Escutadores
menuControlOpen.addEventListener('click', toggleMenu);
menuControlClose.addEventListener('click', toggleMenu);