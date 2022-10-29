export default function cancelClickOnBackground(backgroundModal) {
  const d = document
  const $typeOfProductSection = d.querySelector(".typeOfProduct-section");
  const $backgroundModal = d.querySelector(".background-modal");
  const $warnIncompleteArticle = d.querySelector(".warn-incomplete-article");
  const $unitaryNameInput = d.querySelector(".unitary-name-input");
  const $unitaryQuantityIinput = d.querySelector(".unitary-quantity-input");
  const $unitaryPriceInput = d.querySelector(".unitary-price-input");
  const $byWeightNameInput = d.querySelector(".byWeight-name-input");
  const $byWeightWeightInput = d.querySelector(".byWeight-weight-input");
  const $byWeightPriceInput = d.querySelector(".byWeight-price-input");
  const $dolarBcvSection = d.querySelector(".dolar-bcv-section");
  const $dolarBcvInput = d.querySelector(".dolar-bcv-input");
  const $dolarBcvRateWarn = d.querySelector(".dolar-bcv-rate-warn");
  const $articleDeleteConfirm = d.querySelector(".article-delete-confirm");
  const $budgetInput = d.querySelector(".budget-input");
  const $productList = d.querySelector(".product-list");
  const $addProductSection = d.querySelector(".add-product-section");
  const $addProductNameInput = d.querySelector(".add-product-name-input");

  d.addEventListener('click', e => {
    if (e.target.matches(backgroundModal)) {
      if (!$dolarBcvRateWarn.classList.contains('hidden')) {
        return
      } else {
        $typeOfProductSection.classList.add("hidden");
        $backgroundModal.classList.add("hidden");
        $warnIncompleteArticle.classList.add("hidden");
        $dolarBcvSection.classList.add("hidden");
        $articleDeleteConfirm.classList.add('hidden')
        $unitaryNameInput.value = ''
        $unitaryQuantityIinput.value = "1";
        $unitaryPriceInput.value = ''
        $byWeightNameInput.value = ''
        $byWeightWeightInput.value = ''
        $byWeightPriceInput.value = ''
        $dolarBcvInput.value = "";
        $budgetInput.value = ''
        $productList.classList.remove('to-right')
        $productList.removeAttribute("style");
        $addProductSection.classList.add('hidden')
        $addProductNameInput.value = ''
      }
    }
  })
}