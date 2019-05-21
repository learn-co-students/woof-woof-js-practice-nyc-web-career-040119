const PUPS_URL = "http://localhost:3000/pups"
const pupsBar = document.querySelector('#dog-bar')
const pupInfo = document.querySelector('#dog-info')
const pupFilter = document.querySelector('#good-dog-filter')

indexFetch()
// Populate Dog's Page
pupsBar.addEventListener('click', e => {
  let pupID = e.target.id
  getPupperInfo(pupID)
})

// Filter Only Good Puppers
pupFilter.addEventListener('click', e => {
  let showSpan = document.querySelector('#dog-bar')
  pupsBar.innerHTML = ``
  let filterSt = (pupFilter.innerText === "Filter good dogs: OFF" ? pupFilter.className = true : pupFilter.className = false)
  filterSt = !filterSt
  if (filterSt) {
    pupFilter.innerText = `Filter good dogs: OFF`
    indexFetch()
  } else {
    pupFilter.innerText = `Filter good dogs: ON`
    indexFetch(true)
  }
})

// Change Good Dog to Bad Dog
pupInfo.addEventListener('click', e => {
  let button = e.target
  let switchUp = JSON.parse(button.className)
  let showSpan = document.querySelector(`.show${button.id}`)

  switchUp = !switchUp

  if (switchUp) {
    // debugger
    button.innerText = "Good Dog!"
    button.className = "true"
    if (pupFilter.className === "true") {
      showSpan.style.display = ''
    }
  } else {
    button.innerText = "Bad Dog!"
    button.className = "false"
    if (pupFilter.className === "true") {
      showSpan.style.display = 'none'
    }
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

function indexFetch(filter) {
  fetch(PUPS_URL)
    .then(r => r.json())
    .then(pups => {
      pups.forEach(pup => {
        pupsBar.innerHTML += `
        <span class="show${pup.id}" id="${pup.id}">${pup.name}</span>
        `
      if (filter) {
        if (pup.isGoodDog === !filter) {
          document.querySelector(`.show${pup.id}`).style.display = 'none'
        }
      }
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
