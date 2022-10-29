export default function dragNDropProductMobile() {
  const d = document;
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

  let productWhenDrop;

  for (const product of $productListInfo) {
    product.addEventListener("touchstart", touchStart);
    product.addEventListener("touchmove", touchMove);
    product.addEventListener("touchend", touchEnd);
  }

  function touchStart(e) {
    //e.preventDefault()

    if (e.target.tagName == "DIV") {
      const typeOfProduct = e.target.children[2].textContent;

      if (typeOfProduct == "u") {
        $unitaryInfoContainer.classList.remove("hidden");
        $byWeightInfoContainer.classList.add("hidden");
        $unitaryBtn.classList.add("focus");
        $byWeightBtn.classList.remove("focus");

        $unitaryNameInput.value = e.target.children[1].textContent;
      } else if (typeOfProduct == "p") {
        $unitaryInfoContainer.classList.add("hidden");
        $byWeightInfoContainer.classList.remove("hidden");
        $unitaryBtn.classList.remove("focus");
        $byWeightBtn.classList.add("focus");

        $byWeightNameInput.value = e.target.children[1].textContent;
      }

      productWhenDrop = e.target;
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

    productWhenDrop.style.opacity = '0.5';

    [...e.changedTouches].forEach((touch) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.style.top = `${touch.pageY}px`;
      dot.style.left = `${touch.pageX}px`;
      dot.id = touch.identifier;
      document.body.append(dot);
    });
  }
  
  function touchMove(e) {
    const productListSpace = $productList.getBoundingClientRect().right;
    
    [...e.changedTouches].forEach((touch) => {
      const dot = document.getElementById(touch.identifier);
      dot.style.zIndex = "16";
      dot.style.top = `${touch.pageY - 30}px`;
      dot.style.left = `${touch.pageX - 15}px`;

      if (touch.pageX >= productListSpace) {
        $backgroundModal.style.background = 'green'
      } else {
        $backgroundModal.removeAttribute('style')
      }

    });
  };

  function touchEnd(e) {
    const productListSpace = $productList.getBoundingClientRect().right;
    productWhenDrop.removeAttribute('style');

    [...e.changedTouches].forEach((touch,) => {
      const dot = document.getElementById(touch.identifier);
      dot.remove();

      if (touch.pageX >= productListSpace) {
        $backgroundModal.removeAttribute("style");
        
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
          $typeOfProductSection.classList.remove("hidden");

          productWhenDrop.remove();

          const $productListInfo = d.querySelectorAll(".product-list-info");
          $productsQuantity.innerText = $productListInfo.length;
        }
      }
    });

    const $productListInfo = d.querySelectorAll(".product-list-info");
    let productListArr = [];
    let productAndType = [];
    let ls = "";

    $productListInfo.forEach((product) => {
      productAndType.push(product.children[1].textContent);
      productAndType.push(product.children[2].textContent);

      productListArr.push([...productAndType]);

      productAndType.splice(0, 2);
    });

    ls = JSON.stringify(productListArr);

    localStorage.setItem("product-list", ls);
  }
  
}