export default function searchProductToBuy(ProductToBuy) {
  const d = document

  d.addEventListener('keyup', e => {
    const $productListInfo = d.querySelectorAll(".product-list-info p");
    const $searchListValue = d.querySelector(".search-list").value;

    if (e.target.matches(ProductToBuy)) {
      let regex = new RegExp($searchListValue, 'i');
      
      $productListInfo.forEach(product => {
        if (!regex.test(product.textContent)) {
          product.parentElement.classList.add('hidden')
        }

        if ($searchListValue == "" || regex.test(product.textContent)) {
          product.parentElement.classList.remove("hidden");
        }
      })
    }
  })
}