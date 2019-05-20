const PUPS_URL = "http://localhost:3000/pups"
const pupsBar = document.querySelector('#dog-bar')
const pupInfo = document.querySelector('#dog-info')
const pupFilter = document.querySelector('#good-dog-filter')
let switcher = false

indexFetch()
// Filter Only Good Puppers
pupFilter.addEventListener('click', e => {
  let button = e.target
  let filterSt = (button.innerText === "Filter good dogs: OFF" ? true : false)
  pupsBar.innerHTML = ``
  filterSt = !filterSt
  if (filterSt) {
    button.innerText = `Filter good dogs: OFF`
    indexFetch()
  } else {
    button.innerText = `Filter good dogs: ON`
    filterPuppers(true)
  }
})

// Populate Dog's Page
pupsBar.addEventListener('click', e => {
  let pupID = e.target.id
  getPupperInfo(pupID)
})

// Change Good Dog to Bad Dog
pupInfo.addEventListener('click', e => {
  let button = e.target
  let switchUp = JSON.parse(button.className)

  switchUp = !switchUp

  if (switchUp) {
    button.innerText = "Good Dog!"
    button.className = "true"
  } else {
    button.innerText = "Bad Dog!"
    button.className = "false"
  }
  fetFunc(PUPS_URL + `/${e.target.id}`,"PATCH",{isGoodDog: switchUp})
})

// Helper/Cleanup Functions For Fetching
function fetFunc(url, method = "GET", body) {
  fetch(url, {
    method: method,
    headers:
      {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    body: JSON.stringify(body)
  })
}

function indexFetch() {
  fetch(PUPS_URL)
    .then(r=>r.json())
    .then(function(pups) {
      pups.forEach(function(pup) {
        pupsBar.innerHTML += `
        <span id="${pup.id}">${pup.name}</span>
        `
      })
    })
}

function filterPuppers(pupFilterValue) {
  fetch(PUPS_URL)
    .then(r => r.json())
    .then(pups => {
      return pups.filter(function(pup) {
        return pup.isGoodDog === pupFilterValue
      })
      console.log(pups);
    })
    .then(goodPups => {
      goodPups.forEach(function(pup) {
        pupsBar.innerHTML += `
        <span id="${pup.id}">${pup.name}</span>
        `
      })
    })
}

function getPupperInfo(pupID) {
  fetch(PUPS_URL + `/${pupID}`)
    .then(r => r.json())
    .then(pup => {
      pupInfo.innerHTML = `
        <img src=${pup.image}>
        <h2>${pup.name}</h2>
        <button class="${pup.isGoodDog}" id="${pup.id}">${pup.isGoodDog ? "Good" : "Bad"} Dog!</button>
      `
    })
}
