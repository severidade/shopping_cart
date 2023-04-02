const saveCartItems = (cart) => {
  localStorage.setItem('savedCart', JSON.stringify(cart));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
