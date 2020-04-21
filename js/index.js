// ITERATION 1

function updateSubtotal(product) {
  let productValue = product.querySelector('.price span').innerText;
  let productQuantity = product.querySelector('.quantity input').value;
  if (productQuantity < 0) {
    productQuantity = 0;
    product.querySelector('.quantity input').value = 0;
  }
  const totalValue = productValue * productQuantity;
  const $productTotalValue = product.querySelector('.subtotal span');
  $productTotalValue.innerText = totalValue;
  return totalValue;
}

function calculateAll() {
  // ITERATION 2
  const allProducts = document.querySelectorAll('.product');
  let price = 0;
  for (let product of allProducts) {
    price += updateSubtotal(product);
  }

  // ITERATION 3
  const $totalValue = document.querySelector('#total-value span');
  $totalValue.innerText = price;
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  const $productElement = target.parentNode.parentNode;
  const $cartElement = $productElement.parentNode;
  $cartElement.removeChild($productElement);
  calculateAll();
}

// ITERATION 5

function createProduct() {
  const target = event.currentTarget;
  const $productToCreate = target.parentNode.parentNode;
  const name = $productToCreate.querySelector('.name input').value;
  const price = $productToCreate.querySelector('.price input').value;
  if (!name.length || price <= 0) {
    return alert('Product must have a name and price higher than 0!');
  }
  $productToCreate.querySelector('.name input').value = '';
  $productToCreate.querySelector('.price input').value = 0;
  const $tableElement = document.querySelector('#cart');
  const $productList = $tableElement.querySelector('tbody');

  /* Doesn't work if you create a product without at least one existing product on the cart
  const $productToClone = $tableElement.querySelector('.product');
  let $clonedProduct = $productToClone.cloneNode(true);
  $clonedProduct.querySelector('.name span').innerText = name;
  $clonedProduct.querySelector('.price span').innerText = price;
  $clonedProduct
    .querySelector('.action button')
    .addEventListener('click', removeProduct);
  $productList.appendChild($clonedProduct); 
  */

  //Create new Product
  const newProduct = document.createElement('tr');
  newProduct.classList.add('product');
  $productList.appendChild(newProduct);

  //Add product name
  const newProductName = document.createElement('td');
  newProductName.classList.add('name');
  newProduct.appendChild(newProductName);
  const newProductNameValue = document.createElement('span');
  newProductNameValue.innerText = name;
  newProductName.appendChild(newProductNameValue);

  //Add product price
  const newProductPrice = document.createElement('td');
  newProductPrice.innerText = '$';
  newProductPrice.classList.add('price');
  newProduct.appendChild(newProductPrice);
  const newProductPriceValue = document.createElement('span');
  newProductPriceValue.innerText = price;
  newProductPrice.appendChild(newProductPriceValue);

  //Add product quantity
  const newProductQuantity = document.createElement('td');
  newProductQuantity.classList.add('quantity');
  newProduct.appendChild(newProductQuantity);
  const newProductQuantityInput = document.createElement('input');
  newProductQuantityInput.type = 'number';
  newProductQuantityInput.value = '0';
  newProductQuantityInput.min = '0';
  newProductQuantityInput.placeholder = 'Quantity';
  newProductQuantity.appendChild(newProductQuantityInput);

  //Add product subtotal
  const newProductSubtotal = document.createElement('td');
  newProductSubtotal.classList.add('subtotal');
  newProductSubtotal.innerText = '$';
  newProduct.appendChild(newProductSubtotal);
  const newProductSubtotalValue = document.createElement('span');
  newProductSubtotalValue.innerText = '0';
  newProductSubtotal.appendChild(newProductSubtotalValue);

  //Add prodcut remove button
  const newProductRemove = document.createElement('td');
  newProductRemove.classList.add('action');
  newProduct.appendChild(newProductRemove);
  const newProductRemoveButton = document.createElement('button');
  newProductRemoveButton.classList.add('btn');
  newProductRemoveButton.classList.add('btn-remove');
  newProductRemoveButton.innerText = 'Remove';
  newProductRemove.appendChild(newProductRemoveButton);
  newProductRemoveButton.addEventListener('click', removeProduct);
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  const $removeProductBtn = document.querySelectorAll(
    '.product .action button'
  );
  const $createProductBtn = document.querySelector('#create');
  calculatePricesBtn.addEventListener('click', calculateAll);
  for (let removeButton of $removeProductBtn) {
    removeButton.addEventListener('click', removeProduct);
  }
  $createProductBtn.addEventListener('click', createProduct);
});
