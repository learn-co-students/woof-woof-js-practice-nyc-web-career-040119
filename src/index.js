document.addEventListener("DOMContentLoaded", () => {
  // VARIABLES
  const PUP_URLS = 'http://localhost:3000/pups'
  const filterDiv = document.querySelector("#filter-div")
  const dogSummaryContainer = document.querySelector("#dog-summary-container")
  const dogBar = document.querySelector("#dog-bar")
  const dogInfo = document.querySelector("#dog-info")

  // BONUS
  const goodDogFilter = document.querySelector("#good-dog-filter")
  let toggleFilter = false

  // READ
  // dog-bar
  // get request
  fetch(PUP_URLS)
  .then(response => response.json())
  .then(pups => {

    pups.forEach(pup => {
      const newPup = document.createElement("span")
      newPup.id = pup.id
      newPup.innerText = pup.name
      newPup.isGoodDog = pup.isGoodDog

      dogBar.appendChild(newPup)

      // dog-info
      newPup.addEventListener("click", () => {
        const goodDogBadDogButton = document.createElement("button")
        goodDogBadDogButton.id = pup.id

        if (pup.isGoodDog){
          goodDogBadDogButton.innerText = "Good Dog!"
        } else {
          goodDogBadDogButton.innerText = "Bad Dog!"
        }

        dogInfo.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        `
        dogInfo.appendChild(goodDogBadDogButton)

        // UPDATE

        goodDogBadDogButton.addEventListener("click", event => {
          let clickDogButton = event.target
          let clickDogId = event.target.id

          if (pup.isGoodDog){
            pup.isGoodDog = !pup.isGoodDog
            clickDogButton.innerText = "Bad Dog!"

            // toggleFilter
            if (toggleFilter){
              newPup.style.display = "none"
            } else {
              newPup.style.display = ""
            }
          } else {
            pup.isGoodDog = !pup.isGoodDog
            clickDogButton.innerText = "Good Dog!"
            // newPup.style.display = ""
          }

          // patch request
          fetch(PUP_URLS + `/${clickDogId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              isGoodDog: pup.isGoodDog
            })
          }) // end fetch
        }) // end dogSummaryContainer event listener
      }) // end newPup event listener
    }) // end forEach
  })
  // end get request

  // BONUS
  goodDogFilter.addEventListener("click", (event) => {
    toggleFilter = !toggleFilter

    // update text on toggle
    if (toggleFilter){
      goodDogFilter.innerText = "Filter good dogs: ON"
    } else {
      goodDogFilter.innerText = "Filter good dogs: OFF"
    }

    // hide bad dogs if toggled
    const allDogSpans = dogBar.children
    for (const dogSpan of allDogSpans){
      if (toggleFilter && !dogSpan.isGoodDog){
        dogSpan.style.display = "none"
      } else {
        dogSpan.style.display = ""
      }
    }

  }) // end goodDogFilter event listener
})
