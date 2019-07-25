const bar = document.getElementById('dog-bar')
const info = document.getElementById('dog-info')
const filterBtn = document.getElementById('good-dog-filter')
// fetch pups info(name) to <span> and put to id#'dog-bar'
// when clicks on span tag in dogbar
// show more info(image,name,isGoodDog) to <div id="dog-info">
// a `button` that says `"Good Dog!"` or `"Bad Dog!"` based on whether `isGoodDog` is true or false.
// use ternary operate
fetch('http://localhost:3000/pups')
.then(res=>res.json())
.then(pups=>{
  pups.forEach(pup=>{
    bar.innerHTML += `
    <span id=${pup.id}>${pup.name}</span>
    `
  })
})

bar.addEventListener('click',e=>{
  // console.log(e.target.tagName) UPPERCASE SPAN
     let dogId = e.target.id
    if(e.target.tagName == 'SPAN'){
      fetch(`http://localhost:3000/pups/${dogId}`)
      .then(res=>res.json())
      .then(pup=>{
        renderPup(pup)
        })
    }
})

function renderPup(pup){
   info.innerHTML = `
  <img src=${pup.image}>
  <h2 id=${pup.id}>${pup.name}</h2>
   <button id='btn'>${pup.isGoodDog? "Good Dog!":"Bad Dog!"}</button>
  `
  let btn = document.getElementById('btn')
  btn.addEventListener('click', handleButton)
}

// TOGGLE GOOD DOG, when clicks the g/b button
// innerText changes from g-b/b-g,  PATCH to http://localhost:3000/pups/:id
function handleButton(e){
  // console.log(e.target.id) console.log(e.target.innerText)
    let dogId = e.target.previousElementSibling.id
    let value
  if(e.target.id == 'btn'){
      if(e.target.innerText == 'Good Dog!'){
      e.target.innerText = 'Bad Dog!'
      value = false
      } else{
        e.target.innerText = 'Good Dog!'
        value = true
      }
  }
  fetch(`http://localhost:3000/pups/${dogId}`, {
    method:'PATCH',
    headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
      body:JSON.stringify({
       isGoodDog: value
      })
  })
}
 // FILTER GOOD DOGS clicks filter good dogs btn
 // btn text changes "Filter good dogs: OFF"/"Filter good dogs: OFF"
 // if btn on, dog bar only show pups isGoodDog true, if off show all PUPS
 filterBtn.addEventListener('click', e=>{
   if(e.target.innerText == 'Filter good dogs: OFF'){
     e.target.innerText = 'Filter good dogs: ON'
     fetch('http://localhost:3000/pups')
     .then(res=>res.json())
     .then(pups=>{
       bar.innerHTML = ``
       pups.forEach(pup=>{
         if(pup.isGoodDog){
           bar.innerHTML += `
           <span id=${pup.id}>${pup.name}</span>
           `
         }
       })
     bar.addEventListener('click',handleInfo)
     })
   }else{
     e.target.innerText = 'Filter good dogs: OFF'
     fetch('http://localhost:3000/pups')
     .then(res=>res.json())
     .then(pups=>{
       bar.innerHTML = ``
       pups.forEach(pup=>{
         bar.innerHTML += `
         <span id=${pup.id}>${pup.name}</span>
         `
       })
     bar.addEventListener('click',handleInfo)
     })
   }
 })
