const pupsUrl = "http://localhost:3000/pups"

function grab(selector) {
  return document.querySelector(selector)
}

document.addEventListener('DOMContentLoaded', function(){
  const dogBar = grab('#dog-bar')

  fetch(pupsUrl).then(resp => resp.json())
  .then(pupsObj => {
    pupsObj.forEach((pup) => {
      dogBar.innerHTML += `
          <span id="pup-${pup.id}">
            ${pup.name}
          </span>
      `
      })
    })
  //********************** fetchDataForDogBar END







































})//DOMContentLoaded END
