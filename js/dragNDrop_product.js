export default function dragNDropProduct() {
  const d = document
  const $dolarRate = d.querySelector(".dolar h2");
  const $bcvBtn = d.querySelector(".bcv-btn");
  const $dolarBcvRateWarn = d.querySelector(".dolar-bcv-rate-warn");
  const $productList = d.querySelector(".product-list");
  const $productListInfo = d.querySelectorAll(".product-list-info");
  const $backgroundModal = d.querySelector(".background-modal");
  const $typeOfProductSection = d.querySelector(".typeOfProduct-section");
  const $unitaryInfoContainer = d.querySelector(".unitary-info");
  const $byWeightInfoContainer = d.querySelector(".byWeight-info");
  const $unitaryBtn = d.querySelector(".unitary-btn");
  const $byWeightBtn = d.querySelector(".byWeight-btn");
  const $unitaryNameInput = d.querySelector(".unitary-name-input");
  const $byWeightNameInput = d.querySelector(".byWeight-name-input");
  const $productsQuantity = d.querySelector(".products-quantity");

  let productWhenDrop

  for (const product of $productListInfo) {
    product.addEventListener('dragend', dragEnd)
    product.addEventListener('mousedown', mouseDown)
  }

  $backgroundModal.addEventListener("dragover", dragOver);
  $backgroundModal.addEventListener('drop', dragDrop)
  $backgroundModal.addEventListener('dragleave', dragLeave)

  function dragOver(e) {
    e.preventDefault()
    $backgroundModal.style.background = 'green'
  }
  
  function dragEnd() {
    $backgroundModal.removeAttribute('style')
  }

  function dragLeave() {
    $backgroundModal.removeAttribute('style')
  }

  function dragDrop(e) {
    $productList.classList.remove("to-right");
    $productList.removeAttribute("style");

    if ($dolarRate.textContent == "") {
      setTimeout(() => {
        $dolarBcvRateWarn.classList.remove("hidden");
        $bcvBtn.classList.add("shines-animation");
        $backgroundModal.classList.remove("hidden");

        setTimeout(() => {
          $dolarBcvRateWarn.classList.add("hidden");
          $bcvBtn.classList.remove("shines-animation");
          $backgroundModal.classList.add("hidden");
        }, 4000);
      }, 100);

    } else {
      $typeOfProductSection.classList.remove('hidden')
      
      productWhenDrop.remove()
  
      const $productListInfo = d.querySelectorAll(".product-list-info");
      $productsQuantity.innerText = $productListInfo.length
    }
  }

  function mouseDown(e) {
    if (e.target.tagName == 'DIV') {
      const typeOfProduct = e.target.children[2].textContent;

      if (typeOfProduct == 'u') {
        $unitaryInfoContainer.classList.remove('hidden')
        $byWeightInfoContainer.classList.add('hidden')
        $unitaryBtn.classList.add("focus");
        $byWeightBtn.classList.remove("focus");

        $unitaryNameInput.value = e.target.children[1].textContent

      } else if (typeOfProduct == "p") {
        $unitaryInfoContainer.classList.add("hidden");
        $byWeightInfoContainer.classList.remove("hidden");
        $unitaryBtn.classList.remove("focus");
        $byWeightBtn.classList.add("focus");

        $byWeightNameInput.value = e.target.children[1].textContent;
      }
      
      productWhenDrop = e.target

    } else {
      const typeOfProduct = e.target.parentNode.children[2].textContent;

      if (typeOfProduct == "u") {
        $unitaryInfoContainer.classList.remove("hidden");
        $byWeightInfoContainer.classList.add("hidden");
        $unitaryBtn.classList.add("focus");
        $byWeightBtn.classList.remove("focus");

        $unitaryNameInput.value = e.target.parentNode.children[1].textContent;

      } else if (typeOfProduct == "p") {
        $unitaryInfoContainer.classList.add("hidden");
        $byWeightInfoContainer.classList.remove("hidden");
        $unitaryBtn.classList.remove("focus");
        $byWeightBtn.classList.add("focus");

        $byWeightNameInput.value = e.target.parentNode.children[1].textContent;
      }

      productWhenDrop = e.target.parentNode;
    }
    
  };
}