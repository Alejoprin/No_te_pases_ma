export default function searchArticle(articleToSearch) {
  const d = document;

  d.addEventListener('keyup', e => {
    const $articlesDescription = d.querySelectorAll(".article-description");
    const $searchInputValue = d.querySelector(".search").value;

    if (e.target.matches(articleToSearch)) {
      let regex = new RegExp($searchInputValue, 'i')

      $articlesDescription.forEach(article => {
        console.log(article.parentElement);
        if (!regex.test(article.textContent)) {
          article.parentElement.classList.add('hidden')
        }

        if ($searchInputValue == '' || regex.test(article.textContent)) {
          article.parentElement.classList.remove('hidden')
        }
      })
    }
  })

}