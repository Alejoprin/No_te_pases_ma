import dragNDropProduct from "./dragNDrop_product.js";
import dragNDropProductMobile from "./dragNDrop_product_mobile.js";

export default function productList() {
  const d = document
  const $productListOpenBtn = d.querySelector(".product-list-open-btn");
  const $productList = d.querySelector(".product-list");
  const $productsQuantity = d.querySelector(".products-quantity");
  const $productListContainer = d.querySelector(".product-list-container");
  const $backgroundModal = d.querySelector(".background-modal");
  const $addProductSection = d.querySelector(".add-product-section");
  const $addBtnList = d.querySelector(".add-btn-list");
  const $addProductNameInput = d.querySelector(".add-product-name-input");
  const $addProductBtn = d.querySelector(".add-product-btn");
  const $cancelProductBtn = d.querySelector(".cancel-product-btn");
  const $deleteBtnList = d.querySelector(".delete-btn-list");
  const $saveBtnList = d.querySelector(".save-btn-list");
  const $productListSaveMsj = d.querySelector(".product-list-save-msj");

  totalProducts();
  
  $productListOpenBtn.addEventListener('click', e => {
    $productList.classList.toggle('to-right')
    $backgroundModal.classList.remove('hidden')
    $productList.style.zIndex = "15";

    
    if (!$productList.classList.contains('to-right')) {
      $backgroundModal.classList.add('hidden')
      $productList.removeAttribute('style')
    }
  })

  $addBtnList.addEventListener('click', e => {
    $addProductSection.classList.remove('hidden')
    $productList.classList.remove('to-right')
    $productList.removeAttribute("style");
  })

  $addProductBtn.addEventListener('click', e => {
    const $addProductTypeSelect = d.querySelector(".add-product-type-select");
    const $div = d.createElement('div')
    const $inputChekbox = d.createElement('input')
    const $p = d.createElement('p')
    const $span = d.createElement('span')
    
    if ($addProductNameInput.value) {
      $addProductSection.classList.add("hidden");
      $productList.classList.add("to-right");

      $div.setAttribute("class", "product-list-info");
      $div.setAttribute("draggable", "true");
      $inputChekbox.setAttribute("type", "checkbox");
      $inputChekbox.setAttribute("class", "product-list-input");
      $p.innerText = $addProductNameInput.value
      $span.textContent = $addProductTypeSelect.value
  
      $div.append($inputChekbox, $p, $span)
      $productListContainer.appendChild($div)
      $addProductNameInput.value = ''
      totalProducts();

    } else {
      if (!$addProductSection.getAttribute('style')) {
        $p.innerText = 'Coloque el nombre del producto'
        $p.style.fontWeight = 'Bold'
        $p.style.fontSize = "var(--font-size-medium)";
  
        $addProductSection.style.height = '300px'
        $addProductSection.appendChild($p)
  
        setTimeout(() => {
          $addProductSection.removeAttribute('style');
          $addProductSection.removeChild($p)
        }, 2500)
      }
    }

    $productList.style.zIndex = "15";
    dragNDropProduct();
    dragNDropProductMobile()
  })

  $cancelProductBtn.addEventListener('click', e => {
    $addProductSection.classList.add("hidden");
    $productList.classList.add("to-right");
    $productList.style.zIndex = "15";

    $addProductNameInput.value = "";
  })

  $deleteBtnList.addEventListener('click', e => {
    const $productListInfo = d.querySelectorAll(".product-list-info input");

    $productListInfo.forEach(product => {
      if (product.checked) {
        product.parentNode.remove()
      }
    })

    totalProducts();
  })

  $saveBtnList.addEventListener('click', e => {
    const $productListInfo = d.querySelectorAll(".product-list-info");
    let productListArr = []
    let productAndType = []
    let ls = ''

    $productListInfo.forEach(product => {
      productAndType.push(product.children[1].textContent); 
      productAndType.push(product.children[2].textContent); 

      productListArr.push([...productAndType])

      productAndType.splice(0,2)
    })

    ls = JSON.stringify(productListArr)

    localStorage.setItem('product-list', ls)

    setTimeout(() => {
      $productListSaveMsj.classList.remove('hidden')
      setTimeout(() => {
        $productListSaveMsj.classList.add('hidden')
      }, 1500)
    }, 100)
  })

  function totalProducts() {
    const $productListInfo = d.querySelectorAll(".product-list-info");

    return $productsQuantity.innerText = $productListInfo.length
  }
  
}