const getSavedCartItems = () => {
  const savedItems = localStorage.getItem('savedCart');
  return savedItems;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
