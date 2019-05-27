
// const dogName = tagSelector(`b${puppy.id}`)
//step 2 adding puppys to dog bar and show puppys
// fetch(allData, {method: "GET"})
// .then (function (respond) { return respond.json()})
// .then ( function (puppys) {
//   puppys.forEach( function (puppy) {
//
//
//   const newPuppy = document.createElement('span')
//   newPuppy.id = puppy.id
//
//   newPuppy.innerText = puppy.name
//   dogBar.appendChild(newPuppy)
//
//   newPuppy.addEventListener('click', (event) => {
//     const goodOrBadDogButton = document.createElement('button')
//     goodDogFilter.isgoodDog = puppy.isgoodDog
//     //preventing the dog to show multiple time
//
//     //button for good or bad dog
//     // puppy.id = goodOrBadDogButton.id
//
//     let targetId = event.target.id
//     let pupper;
//
//     if (puppy.id === targetId){
//       console.log(puppy)
//     }
//
//     console.log(pupper)
//
//     if(puppy.isgoodDog === true) {
//       goodOrBadDogButton.innerText = 'Good Dog!'
//     } else if (puppy.isgoodDog === false){
//       goodOrBadDogButton.innerText = 'Bad Dog!'
//     }
//
//     dogInfo.innerHTML +=
//     `<img src='${puppy.image}'>
//     <h2>${puppy.name}</h2>
//     `
//     dogInfo.appendChild(goodOrBadDogButton)
//   })
//
//
//   })
// })
//
// //
//
//
//helper method for grabing the tag id
function tagSelector (selector) {
  return document.querySelector(selector)
}

const allData = "http://localhost:3000/pups"
const dogBar = document.querySelector('#dog-bar')
const goodDogFilter = tagSelector('#good-dog-filter')
const dogInfo = tagSelector('#dog-info')
const dogArray = []


fetch (allData, {method: "GET"})
.then (respond => {return respond.json()})
.then (puppys => {
  // console.log(puppys)
  puppys.forEach( (puppy) => {
    // console.log(puppy)
    dogArray.push(puppy)
    const pupName = document.createElement('span')
    pupName.innerHTML = puppy.name
    pupName.id = puppy.id
    dogBar.appendChild(pupName)
    // dogInfo.innerHTML += `<span id='s${puppy.id}'>${puppy.name}</span>`
    // let singlePuppy = tagSelector(`#s${puppy.id}`
    })

})

dogBar.addEventListener('click', function(e) {
  // console.log(dogArray)
  const targetId = parseInt(e.target.id)
  const individualDog = dogArray.find( puppy =>puppy.id === targetId)
    // console.log(typeof(e.target.id))
      dogInfo.innerHTML = `<img src='${individualDog.image}'>
          <h2>${individualDog.name}</h2>
        <button id= '${individualDog.id}'>${individualDog.isGoodDog ? 'Good Dog!' : 'Bad Dog!'}</button>`
  })

dogInfo.addEventListener("click", function(e) {
  // console.log(e.target)
  if (e.target.innerText === "Good Dog!") {
    e.target.innerText = "Bad Dog!"
    fetch(`http://localhost:3000/pups/${e.target.id}`, {
      method: 'PATCH',
      headers: {
              'Content-Type': 'application/json',
          },body: JSON.stringify({ isGoodDog: false})

      })
  } else if (e.target.innerText === "Bad Dog!") {
    e.target.innerText = "Good Dog!"
    fetch(`http://localhost:3000/pups/${e.target.id}`, {
      method: 'PATCH',
      headers: {
              'Content-Type': 'application/json',
          },body: JSON.stringify({ isGoodDog: true})
      })
  }
})


goodDogFilter.addEventListener('click', function (e) {
    if (e.target.innerText === 'Filter good dogs: OFF') {
      e.target.innerText = 'Filter good dogs: ON'
      const onlyGoodDog = dogArray.filter(puppy => puppy.isGoodDog === true)
      // console.log(onlyGoodDog)
      dogBar.innerHTML = `<span id= ${onlyGoodDog.id}>${onlyGoodDog.name}</span>`
    }
    else if (e.target.innerText === 'Filter good dogs: ON') {
      return e.target.innerText = 'Filter good dogs: OFF'
    }
})
