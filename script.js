// Cria o conteiner para  inserir a soma
function totalItem() {
  const totalPrice = document.querySelector('.total');
  const span = document.createElement('span');
  span.className = 'total-price';
  // div.innerHTML = `<p> Subtotal ${'total'} </p>`;
  totalPrice.appendChild(span);
}

const sumAllPrices = () => {
  let totalPrice = 0;
  const currentCartItem = document.querySelectorAll('.cart__item');
  const priceElement = document.querySelector('.total-price');
  currentCartItem.forEach((item) => { totalPrice += parseFloat(item.innerText.split('$')[1]); });
  priceElement.innerText = `${totalPrice.toFixed(2)}`;
  // coloquei o ToFixed para limitar a duas casas decimais o valor .toFixed()
  // .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
};

function onLoadInfo() {
  const pageLoad = document.querySelector('.items');
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'Carregando...';
  pageLoad.appendChild(p);
}

function emptyCart() {
  const emptyButton = document.querySelector('.empty-cart');
  const currentList = document.querySelector('.cart__items');
  emptyButton.addEventListener('click', () => {
    currentList.innerHTML = '';
    sumAllPrices();
  });
}

function cartItemClickListener(event) {
  const li = event.target;
  li.remove();
  sumAllPrices();
}

// cria os cards dos produtos
function createProductImageElement(imageSource) {
  const conteiner = document.createElement('div');
  conteiner.className = 'conteiner_img';

  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  conteiner.appendChild(img);
  // return img;
  return conteiner;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addProductToCart(productID) {
  const itemData = await fetchItem(productID);
  console.log(itemData.thumbnail);
  const sectionItem = document.querySelector('.cart__items');
  const { id: sku, title: name, price: salePrice } = itemData;
  const chartItem = createCartItemElement({ sku, name, salePrice });
  sectionItem.appendChild(chartItem);
}

function createProductItemElement({ sku, name, image, salePrice }) {
  const section = document.createElement('section');
  section.className = 'item';
  // section.appendChild(onLoadInfo());
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

async function serchProducts(product) { // essa e uma funcao assincrona
  const searchData = await fetchProducts(product); // chamada da funcao fetchproduts.js
  const sectionItems = document.querySelector('.items'); // Target HTMl
  console.log(searchData.results[0]);
  
  searchData.results.forEach((item) => { // results é palcançar os dados no array
    const newImageQuality = item.thumbnail.split('-');
    const imageQuality = [...newImageQuality[0], '-', ...newImageQuality[1], '-J.jpg'].join('');
    const itemObject = {
      sku: item.id,
      name: item.title,
      image: imageQuality,
      salePrice: item.price,
    };
    const productItem = createProductItemElement(itemObject);
    sectionItems.appendChild(productItem);
  });
  const load = document.querySelector('.loading');
  load.remove();
}

window.onload = () => { 
  serchProducts('bolha de babao pistola brinquedo');
  onLoadInfo();
  emptyCart();
  totalItem();
  // sumAllPrices(); isso acho que vai ter que ficar aqui para quando carregar do local storage
};