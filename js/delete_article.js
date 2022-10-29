import { totals } from "./calculating_totals.js";

export const isSubtractOccur = {
  occur: undefined,
};

export default function deleteArticle(deleteArticle, articlesExemptIvaList) {
  const d = document;
  const $articlesWrapper = d.querySelector(".articles-wrapper");
  const $addArticleBtn = d.querySelector(".add-article");
  const $deleteArticleBtn = d.querySelector(".delete-article");
  const $articleDeleteConfirm = d.querySelector(".article-delete-confirm");
  const $backgroundModal = d.querySelector(".background-modal");

  isCheckArticle();

  function isCheckArticle() {
    $articlesWrapper.addEventListener("change", (e) => {
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
    });
  }

  d.addEventListener("click", (e) => {
    const $articleInputList = d.querySelectorAll(".article input");

    if (e.target.matches(`${deleteArticle} *`)) {
      $articleDeleteConfirm.classList.remove("hidden");
      $backgroundModal.classList.remove("hidden");
    }

    if (e.target.matches(".delete-confirm")) {
      $articleInputList.forEach((article) => {
        if (article.checked) {
          subtractTotals(
            article.parentNode.children[1].textContent,
            article.parentNode.children[3].firstElementChild.textContent
          );
          
          isSubtractOccur.occur = true
          article.parentNode.remove();
          $addArticleBtn.classList.remove("toLeftAnimation");
          $deleteArticleBtn.classList.remove("toRightAnimation");
        }
      });

      $articleDeleteConfirm.classList.add("hidden");
      $backgroundModal.classList.add("hidden");
    }

    if (e.target.matches(".delete-reject")) {
      $articleDeleteConfirm.classList.add("hidden");
      $backgroundModal.classList.add("hidden");
    }
  });

  function subtractTotals(articleName, articlePrice) {
    const $dolar = d.querySelector(".dolar h2");
    const $subTotal = d.querySelector(".subTotal h2");
    const $totalVes = d.querySelector(".totalVes h2");
    const $totalDolar = d.querySelector(".totalDolar h2");

    let isArticleMatchWithList = false;

    $subTotal.textContent = (Number($subTotal.textContent) - articlePrice).toFixed(2);

    articlesExemptIvaList.forEach(artExemptIva => {
      if (articleName.toLowerCase() == artExemptIva) {
        $totalVes.textContent = (Number($totalVes.textContent) - (articlePrice * Number($dolar.textContent))).toFixed(2)
        $totalDolar.textContent = (Number($totalDolar.textContent) - articlePrice).toFixed(2)

        totals.subtotal -= (Number(articlePrice)).toFixed(2)

        isArticleMatchWithList = true;
      }
    })

    if (!isArticleMatchWithList) {
      const articleWithIVA = (Number(articlePrice) * 0.16) + Number(articlePrice)
      $totalVes.textContent = (Number($totalVes.textContent) - (articleWithIVA * Number($dolar.textContent))).toFixed(2);
      $totalDolar.textContent = (Number($totalDolar.textContent) - articleWithIVA).toFixed(2)

      totals.subtotal -= (articleWithIVA).toFixed(2)
    }
  }
}
