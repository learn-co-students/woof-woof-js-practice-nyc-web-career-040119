const pupsUrl = "http://localhost:3000/pups"

function grab(selector) {
  return document.querySelector(selector)
}

document.addEventListener('DOMContentLoaded', function() {
  const dogBar = grab('#dog-bar')
  const dogSummaryContainer = grab('#dog-summary-container')


  fetch(pupsUrl).then(resp => resp.json())
    .then(pupsObj => {
      pupsObj.forEach(pup => {
        dogBar.innerHTML += `
          <span id="${pup.id}">
            ${pup.name}
          </span>
      `
    })
  }) //Fetch-GET DOG BAR DATA ***************

  dogBar.addEventListener("click", (event) => {
    let onBarClick = event.target
    let pupId = parseInt(onBarClick.id)
    dogSummaryContainer.innerHTML = ``
    fetch(`http://localhost:3000/pups/${pupId}`).then(resp => resp.json())
      .then(pup => {
        dogSummaryContainer.innerHTML += `
              <h1>DOGGO: ${pup.name}</h1>
              <div id="dog-info">
                <img src="${pup.image}" />
              </div>
              <button id="${pup.id}"> Good Dog!</button>
          `
    })
  })// onClick Fetch-GET for pup-info

  dogSummaryContainer.addEventListener("click", (event) => {
    let clickTarget = event.target
    let onToggleClick = clickTarget.innerText
    let pupId = parseInt(onToggleClick.id)
    if (onToggleClick === "Good Dog!") {
      clickTarget.innerHTML=`Bad Dog!`
    } else {
      clickTarget.innerHTML=`Good Dog!`
    }

      // fetch(`http://localhost:3000/pups/${pupId}`, {
      //   method:"PATCH",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'
      //   },
      //   body: JSON.stringify({
      //     "isGoodDog":
      //   })
      // })

  })//end of onClick Toggle








}) //DOMContentLoaded END
