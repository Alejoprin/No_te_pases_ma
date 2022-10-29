import { isSubtractOccur } from "./delete_article.js";
import { isGenerateOccur } from "./generate_article.js";

export const totals = {
  subtotal: 0
}

export default function calculateTotals(articlesExemptIvaList) {
  const d = document
  const $dolar = d.querySelector(".dolar h2");
  const $subTotal = d.querySelector(".subTotal h2");
  const $totalVes = d.querySelector(".totalVes h2");
  const $totalDolar = d.querySelector(".totalDolar h2");
  const $articlesWrapper = d.querySelector(".articles-wrapper");
  const config = { attributes: false, childList: true, subtree: false };

  const callback = (mutationList) => {
    for (const mutation of mutationList) {
      if (mutation.type === 'childList') {
        const $articlePrice = d.querySelectorAll(".article-price");
        let $articles = d.querySelectorAll('.article').length
        let subTotalResult = 0
        let resultWithIva = 0

        for (let i = 0; i < $articlePrice.length; i++) {
          subTotalResult += parseFloat($articlePrice[i].textContent)
        }

        resultWithIva = totalWithIva()

        if ($articles == 0) {
          $subTotal.textContent = '0.00'
          $totalVes.textContent = "0.00"
          $totalDolar.textContent = "0.00"
        }

        if (isSubtractOccur.occur) {
          isSubtractOccur.occur = false;
        } else if (isGenerateOccur.occur) {
          if ($articles == 0) {
            isGenerateOccur.occur = false;
            $subTotal.textContent = '0.00'
            $totalVes.textContent = "0.00"
            $totalDolar.textContent = "0.00"

          } else {
            isGenerateOccur.occur = false;
            $subTotal.textContent = subTotalResult.toFixed(2);
            $totalVes.textContent = ($dolar.textContent * resultWithIva).toFixed(2);
            $totalDolar.textContent = resultWithIva.toFixed(2);
          }
        }
      }
    }
  }

  const observer = new MutationObserver(callback)
  observer.observe($articlesWrapper, config)

  function totalWithIva() {
    const $articlesDescription = d.querySelectorAll(".article-description");
    let result = 0
    let isArticleMatchWithList = false
    let lastArticle = $articlesDescription[$articlesDescription.length - 1]
    
    if (isSubtractOccur.occur) {
      isSubtractOccur.occur = false

      if ($articlesDescription.length == 0) {
        totals.subtotal = 0;
      }

      return
    } else {
      if ($articlesDescription.length != 0) {
        
        articlesExemptIvaList.forEach(artExemptIva => {
          let regex = new RegExp("^(" + artExemptIva + ")(s?|es?)\s?", 'i');

          if (regex.test(lastArticle.textContent.toLowerCase())) {
            const lastArticlePriceContainer = lastArticle.parentNode.children[3]
            const lastArticlePrice = Number(lastArticlePriceContainer.firstElementChild.textContent)
            
            result = lastArticlePrice
            isArticleMatchWithList = true
          }
        })
    
        if (!isArticleMatchWithList) {
          const lastArticlePriceContainer = lastArticle.parentNode.children[3]
          const lastArticlePrice = Number(lastArticlePriceContainer.firstElementChild.textContent)
    
          result  = (lastArticlePrice * 0.16) + lastArticlePrice
        }
        
        totals.subtotal += result
    
        return totals.subtotal
      } else {
        totals.subtotal = 0
        return totals.subtotal
      }
    }
  }
}
