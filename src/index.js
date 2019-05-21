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

      newPup.addEventListener("click", () => {
        const goodDogBadDogBtn = document.createElement("button")
        goodDogBadDogBtn.id = pup.id
        if (pup.isGoodDog){
          goodDogBadDogBtn.innerText = "Good Dog!"
        } else {
          goodDogBadDogBtn.innerText = "Bad Dog!"
        }

        dogInfo.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        `
        dogInfo.appendChild(goodDogBadDogBtn)

        // UPDATE
        goodDogBadDogBtn.addEventListener("click", () => {

          if (newPup.isGoodDog){
            pup.isGoodDog = !pup.isGoodDog
            newPup.isGoodDog = pup.isGoodDog
            goodDogBadDogBtn.innerText = "Bad Dog!"
            // toggleFilter
            if (toggleFilter){
              newPup.style.display = "none"
            }
          } else {
            pup.isGoodDog = !pup.isGoodDog
            newPup.isGoodDog = pup.isGoodDog
            goodDogBadDogBtn.innerText = "Good Dog!"
            // toggleFilter
            if (toggleFilter){
              newPup.style.display = ""
            }
          }

          // patch request
          fetch(PUP_URLS + `/${pup.id}`, {
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
  goodDogFilter.addEventListener("click", () => {
    toggleFilter = !toggleFilter

    // update text on toggle
    if (toggleFilter){
      goodDogFilter.innerText = "Filter good dogs: ON"
    } else {
      goodDogFilter.innerText = "Filter good dogs: OFF"
    } // end if

    // hide bad dogs if toggled
    const allDogSpans = dogBar.children
    for (const dogSpan of allDogSpans){
      // if toggleFilter is true and dogSpan.isGoodDog is false
      // hide the dog in the span
      if (toggleFilter && !dogSpan.isGoodDog){
        dogSpan.style.display = "none"
      } else {
        dogSpan.style.display = ""
      }
    } // end for
  }) // end goodDogFilter event listener
})
