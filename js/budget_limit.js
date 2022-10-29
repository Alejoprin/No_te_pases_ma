export default function budgetLimit() {
  const d = document
  const $budgetInfo = d.querySelector(".budget");
  const $totalDolar = d.querySelector(".totalDolar h2"); 
  const $totalVesContainer = d.querySelector('.indicator.totalVes')
  const $totalDolarContainer = d.querySelector('.indicator.totalDolar')

  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      const budget = parseInt($budgetInfo.textContent)
      const budget80 = budget * 0.8
      let totalDolarNum = parseFloat($totalDolar.textContent);

      if (totalDolarNum >= budget80 && totalDolarNum < budget) {
        if (!$totalVesContainer.classList.contains("background80")) {
          budgetAlarm80(); 
          $totalVesContainer.classList.add("background80");
          $totalDolarContainer.classList.add("background80");
          $totalVesContainer.classList.remove("background100");
          $totalDolarContainer.classList.remove("background100");
        } 
        
      } else if (totalDolarNum >= budget) {
        if (!$totalVesContainer.classList.contains("background100")) {
          budgetAlarm100();
          $totalVesContainer.classList.add('background100')
          $totalDolarContainer.classList.add("background100");
          $totalVesContainer.classList.remove("background80");
          $totalDolarContainer.classList.remove("background80");
        }
      } else {
        $totalVesContainer.classList.remove("background80");
        $totalDolarContainer.classList.remove("background80");
        $totalVesContainer.classList.remove("background100");
        $totalDolarContainer.classList.remove("background100");
      }

    });
  });

  let config = { attributes: true, childList: true, characterData: true };
  observer.observe($totalDolar, config);

  function budgetAlarm80() {
    const $budgetAlarm = d.querySelector(".budget-alarm");
    const $budgetAlarmInfo = d.querySelector(".budget-alarm-info");

    $budgetAlarmInfo.textContent = "Ya llegaste al 80% del presupuesto";
    $budgetAlarm.classList.remove("background100");
    $budgetAlarm.classList.add('background80')
    
    setTimeout(() => {
      $budgetAlarm.classList.remove('hidden')
      setTimeout(() => {
        $budgetAlarm.classList.add('hidden')
      }, 3000);
    }, 100)
  }

  function budgetAlarm100() {
    const $budgetAlarm = d.querySelector(".budget-alarm");
    const $budgetAlarmInfo = d.querySelector(".budget-alarm-info");

    $budgetAlarmInfo.textContent = "Ya llegaste al 100% del presupuesto";
    $budgetAlarm.classList.remove("background80");
    $budgetAlarm.classList.add("background100");
    
    setTimeout(() => {
      $budgetAlarm.classList.remove('hidden')
      setTimeout(() => {
        $budgetAlarm.classList.add('hidden')
      }, 4000);
    }, 100)
  }
}