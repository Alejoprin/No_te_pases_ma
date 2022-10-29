export default function addDolarBcvAndBudget(bcvBtn) {
  const d = document
  const $indicatorDolarBcv = d.querySelector('.dolar h2')
  const $dolarBcvSection = d.querySelector(".dolar-bcv-section");
  const $dolarBcvInput = d.querySelector(".dolar-bcv-input");
  const $backgroundModal = d.querySelector(".background-modal");
  const $warnIncompleteDolar = d.querySelector(".warn-incomplete-dolar");
  const $dolarBcvRateWarn = d.querySelector(".dolar-bcv-rate-warn");
  const $budgetInput = d.querySelector(".budget-input");
  const $budgetInfo = d.querySelector(".budget");

  d.addEventListener('click', e => {
    if (e.target.matches(bcvBtn)) {
      if (!$dolarBcvRateWarn.classList.contains("hidden")) {
        return
      } else {
        $dolarBcvSection.classList.remove("hidden");
        $backgroundModal.classList.remove("hidden");
      }
    }

    if (e.target.matches('.dolar-bcv-section button')) {
      if ($dolarBcvInput.value == "") {
        $warnIncompleteDolar.children[0].innerText = 'La tasa del dólar tiene que ser mayor a 0'
        setTimeout(() => {
          $warnIncompleteDolar.classList.remove("hidden");
          
          setTimeout(() => $warnIncompleteDolar.classList.add("hidden"), 2000);
        }, 100);
        return
      } else if (!$budgetInput.value) {
        $warnIncompleteDolar.children[0].innerText = "Define el presupuesto en $ para comprar";

        setTimeout(() => {
          $warnIncompleteDolar.classList.remove("hidden");
          setTimeout(() => $warnIncompleteDolar.classList.add("hidden"), 2000);
        }, 100);
        //
        return;
      } else {
        $indicatorDolarBcv.textContent = $dolarBcvInput.value
        $budgetInfo.innerText = `${$budgetInput.value}`;
        $dolarBcvInput.value = '';
        $budgetInput.value = ''
        $dolarBcvSection.classList.add("hidden");
        $backgroundModal.classList.add("hidden");
      }
    }
  })
}