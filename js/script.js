// const shoppingCartBtn = document.querySelector('#shopping_cart');
const cartItems = document.querySelector('.cart__items');
const sectionItems = document.querySelector('.items');

// const form = document.querySelector('#search_new_product');

function onLoadInfo() {
  const pageLoad = document.querySelector('.items');
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'Carregando...';
  pageLoad.appendChild(p);
}

// Cria o container para  inserir a soma
function totalItem() {
  const inicialValue = 0.00;
  const totalPrice = document.querySelector('.total');
  const span = document.createElement('span');
  span.className = 'total-price';
  totalPrice.appendChild(span);
  span.innerText = `${inicialValue.toFixed(2)}`;
}

const sumAllPrices = () => {
  let totalPrice = 0;
  const currentCartItem = document.querySelectorAll('.cart__item');
  const priceElement = document.querySelector('.total-price');
  currentCartItem.forEach((item) => { totalPrice += parseFloat(item.innerText.split('$')[1]); });
  priceElement.innerText = `${totalPrice.toFixed(2)}`;
};

function updateCartItemsCount() {
  const itemCount = cartItems.children.length;
  const novo = document.querySelector('#shopping_cart > span');
  novo.innerText = `${itemCount}`;
}

function emptyCart() {
  const emptyButton = document.querySelector('.empty-cart');
  emptyButton.addEventListener('click', () => {
    cartItems.innerHTML = '';
    sumAllPrices();
    updateCartItemsCount();
  });
}

function cartItemClickListener(event) {
  const li = event.target;
  li.remove();
  sumAllPrices();
  updateCartItemsCount();
}

// cria os cards dos produtos
function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductImageElement(imageSource) {
  const lowQltyImageURL = imageSource.split('-');
  const highQltyImageURL = [...lowQltyImageURL[0], '-', ...lowQltyImageURL[1], '-J.jpg'].join('');
  
  const container = document.createElement('div');
    container.className = 'container_img';
  
  const img = document.createElement('img');
    img.className = 'item__image';
    img.src = highQltyImageURL;
  container.appendChild(img);
  return container;
}

function createCartItemElement({ name, salePrice, imageSource }) {
  const li = document.createElement('li');
  const p = document.createElement('p');
  
  li.className = 'cart__item';
  li.appendChild(p);
  p.innerText = `${name} | PRICE: $${salePrice}`;
  li.appendChild(createProductImageElement(imageSource));
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addProductToCart(productID) {
  const itemData = await fetchItem(productID);
  const { id: sku, title: name, price: salePrice, thumbnail: imageSource } = itemData;
  const chartItem = createCartItemElement({ sku, name, salePrice, imageSource });
  cartItems.appendChild(chartItem);
  updateCartItemsCount();
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createCustomElement('span', 'priceProduct', `${salePrice}`));
  const buttonItem = createCustomElement('button', 'item__add', 'Adicionar ao carrinho!');
  buttonItem.addEventListener('click', async () => {
    await addProductToCart(sku);
    await sumAllPrices();
  });
  section.appendChild(buttonItem);
  return section;
}

async function searchProducts(product) {
  const searchData = await fetchProducts(product);

  searchData.results.forEach((item) => {
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: item.thumbnail,
      salePrice: item.price,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });

  const load = document.querySelector('.loading');
  load.remove();
}

function searchNewProducts() {
  const form = document.querySelector('#search_new_product');
  const campo = document.getElementById('search_item');
  const newSearch = document.getElementById('search');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // impede o envio do form carregando a página novamente
    sectionItems.innerHTML = '';
    onLoadInfo();
    const pesquisa = campo.value;
    newSearch.innerHTML = pesquisa;
    searchProducts(pesquisa);
  });
}

window.onload = async () => { 
  searchProducts('maranta');
  onLoadInfo();
  updateCartItemsCount();
  emptyCart();
  totalItem();
  searchNewProducts();
};