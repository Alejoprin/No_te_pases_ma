import generateArticle from "./js/generate_article.js"
import cancelClickOnBackground from "./js/cancel_click_on_background.js"
import calculateTotals from "./js/calculating_totals.js"
import addDolarBcvAndBudget from "./js/add_dolar_bcv_and_budget.js";
import deleteArticle from "./js/delete_article.js"
import searchArticle from "./js/search_article.js"
import budgetLimit from "./js/budget_limit.js";
import productList from "./js/products_to_buy.js";
import dragNDropProduct from "./js/dragNDrop_product.js";
import searchProductToBuy from "./js/search_product_toBuy.js";
import dragNDropProductMobile from "./js/dragNDrop_product_mobile.js";

const d = document
const $productListContainer = d.querySelector(".product-list-container");
let ls

d.addEventListener('DOMContentLoaded', e => {
  addDolarBcvAndBudget(".bcv-btn");
  generateArticle(".add-article");
  cancelClickOnBackground(".background-modal");
  calculateTotals(articlesExemptIvaList);
  deleteArticle(".delete-article", articlesExemptIvaList);
  searchArticle(".search");
  budgetLimit();
  productList();
  dragNDropProduct();
  searchProductToBuy(".search-list");
  dragNDropProductMobile();
})

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then((reg) => console.log("Registro de SW exitoso", reg))
    .catch((err) => console.warn("Error al tratar de registrar el sw", err));
}

/* PRODUCT LIST */
if (localStorage.getItem('product-list')) {
  ls = localStorage.getItem("product-list");
  ls = JSON.parse(ls)
  ls.forEach(productAndType => {
    const $div = d.createElement("div");
    const $inputChekbox = d.createElement("input");
    const $p = d.createElement("p");
    const $span = d.createElement("span");
  
    $div.setAttribute("class", "product-list-info");
    $div.setAttribute("draggable", "true");
    $inputChekbox.setAttribute("type", "checkbox");
    $inputChekbox.setAttribute("class", "product-list-input");
    $p.innerText = productAndType[0]
    $span.textContent = productAndType[1]
  
    $div.append($inputChekbox, $p, $span);
    $productListContainer.appendChild($div);
  })
}