export const isGenerateOccur = {
  occur: undefined
};

export default function generateArticle(addBtn) {
  const d = document;
  const $dolarRate = d.querySelector(".dolar h2");
  const $bcvBtn = d.querySelector(".bcv-btn");
  const $dolarBcvRateWarn = d.querySelector(".dolar-bcv-rate-warn");
  const $articlesWrapper = d.querySelector(".articles-wrapper");
  const $templateByWeightArticle = d.querySelector(
    ".template-byWeight-article"
  ).content;
  const $fragmentByWeight = d.createDocumentFragment();
  const $templateUnitaryArticle = d.querySelector(
    ".template-unitary-article"
  ).content;
  const $fragmentUnitary = d.createDocumentFragment();
  const $typeOfProductSection = d.querySelector(".typeOfProduct-section");
  const $backgroundModal = d.querySelector(".background-modal");
  const $warnIncompleteArticle = d.querySelector(".warn-incomplete-article");
  const $unitaryBtn = d.querySelector(".unitary-btn");
  const $byWeightBtn = d.querySelector(".byWeight-btn");
  const $unitaryInfo = d.querySelector(".unitary-info");
  const $unitaryNameInput = d.querySelector(".unitary-name-input");
  const $unitaryQuantityIinput = d.querySelector(".unitary-quantity-input");
  const $unitaryPriceInput = d.querySelector(".unitary-price-input");
  const $byWeightInf = d.querySelector(".byWeight-info");
  const $byWeightNameInput = d.querySelector(".byWeight-name-input");
  const $byWeightWeightInput = d.querySelector(".byWeight-weight-input");
  const $byWeightPriceInput = d.querySelector(".byWeight-price-input");
  const $addArticleBtn = d.querySelector(".add-article");
  const $deleteArticleBtn = d.querySelector(".delete-article");
  
  d.addEventListener("click", (e) => {
    if (e.target.matches(`${addBtn} *`)) {
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
        $backgroundModal.classList.remove("hidden");
      }
    }
    
    if (e.target.matches(".unitary-btn")) {
      $unitaryInfo.classList.remove("hidden");
      $byWeightInf.classList.add("hidden");
      $unitaryBtn.classList.add("focus");
      $byWeightBtn.classList.remove("focus");
    }

    if (e.target.matches(".byWeight-btn")) {
      $byWeightInf.classList.remove("hidden");
      $unitaryInfo.classList.add("hidden");
      $unitaryBtn.classList.remove("focus");
      $byWeightBtn.classList.add("focus");
    }

    if (e.target.matches(".generate-article-btn")) {
      if (!$byWeightInf.classList.contains("hidden")) {
        $templateByWeightArticle.querySelector(
          ".article-description"
        ).textContent = $byWeightNameInput.value;
        $templateByWeightArticle.querySelector(".article-weight").textContent =
          $byWeightWeightInput.value;
        $templateByWeightArticle.querySelector(".article-price").textContent = (
          parseFloat($byWeightWeightInput.value) *
          parseFloat($byWeightPriceInput.value)
        ).toFixed(2);

        if (
          $byWeightNameInput.value == "" ||
          $byWeightWeightInput.value == "" ||
          $byWeightPriceInput.value == ""
        ) {
          setTimeout(() => {
            $warnIncompleteArticle.classList.remove("hidden");
            setTimeout(
              () => $warnIncompleteArticle.classList.add("hidden"),
              2000
            );
          }, 100);
        } else {
          let $clone = d.importNode($templateByWeightArticle, true);
          $fragmentByWeight.appendChild($clone);

          $typeOfProductSection.classList.add("hidden");
          $backgroundModal.classList.add("hidden");

          $articlesWrapper.appendChild($fragmentByWeight);

          $unitaryNameInput.value = "";
          $unitaryQuantityIinput.value = "1";
          $unitaryPriceInput.value = "";
          $byWeightNameInput.value = "";
          $byWeightWeightInput.value = "";
          $byWeightPriceInput.value = "";
        }
      } else if (!$unitaryInfo.classList.contains("hidden")) {
        if ($unitaryNameInput.value == "" || $unitaryPriceInput.value == "") {
          setTimeout(() => {
            $warnIncompleteArticle.classList.remove("hidden");
            setTimeout(
              () => $warnIncompleteArticle.classList.add("hidden"),
              2000
            );
          }, 100);
        } else {
          $templateUnitaryArticle.querySelector(
            ".article-description"
          ).textContent = $unitaryNameInput.value;
          $templateUnitaryArticle.querySelector(
            ".article-quantity"
          ).textContent = $unitaryQuantityIinput.value;
          let articleQuantity = $unitaryQuantityIinput.value;
          $templateUnitaryArticle.querySelector(".article-price").textContent =
            ($unitaryPriceInput.value * articleQuantity).toFixed(2);

          let $clone = d.importNode($templateUnitaryArticle, true);
          $fragmentUnitary.appendChild($clone);

          $typeOfProductSection.classList.add("hidden");
          $backgroundModal.classList.add("hidden");

          $articlesWrapper.appendChild($fragmentUnitary);

          $unitaryNameInput.value = "";
          $unitaryQuantityIinput.value = "1";
          $unitaryPriceInput.value = "";
          $byWeightNameInput.value = "";
          $byWeightWeightInput.value = "";
          $byWeightPriceInput.value = "";
        }
      }

      isGenerateOccur.occur = true
    }
    
    if (e.target.matches(".article")) {
      if (e.target.children[0].checked) {
        e.target.children[0].checked = false;
      } else {
        e.target.children[0].checked = true;
      }

      const $articleInputList = d.querySelectorAll(".article input");
      let isAtleastOneCheck = false;

      $articleInputList.forEach((el) => {
        if (el.checked) {
          $addArticleBtn.classList.add("toLeftAnimation");
          $deleteArticleBtn.classList.add("toRightAnimation");
          isAtleastOneCheck = true;
        }

        if (!isAtleastOneCheck) {
          $addArticleBtn.classList.remove("toLeftAnimation");
          $deleteArticleBtn.classList.remove("toRightAnimation");
        }
      });
    }
  });
}
