

fetch('http://localhost:3000/pups')
  .then(function(resp){
    return resp.json()
  }).then(function(dogList){
    let dogDiv = document.querySelector('#dog-bar')

    for(dogs of dogList){

    dogDiv.innerHTML += `
    <span id="${dogs.id}">${dogs.name}</span>
    `
    }

    let dogInfo = document.querySelector('#dog-info')

    dogDiv.addEventListener('click', function(event){


      let clickedId = event.target.id - 1
      let buttonCid = event.target.id
      let dogClicked = dogList[clickedId]
      let temperment = dogClicked.isGoodDog





      if (dogClicked.isGoodDog === true){
        temperment = "Good Dog!"
      }
      else{
        temperment = "Bad Dog!"
      }

      dogInfo.innerHTML = `
      <h2>${event.target.innerText}</h2>
      <img src="${dogClicked.image}">

      `

      button = document.createElement('button')
      button.id = `b${buttonCid}`

      button.innerText = temperment

      console.log(dogList)

      dogInfo.appendChild(button)

      // let btnFind = document.querySelector(button)
      // console.log(btnFind)

      button.addEventListener('click', function(event){
        console.log(button)


        if (dogClicked.isGoodDog === true){
          button.innerText = "Bad Dog!"
        }
        else{
          button.innerText = "Good Dog!"
        }

        fetch(`http://localhost:3000/pups/${button.id.slice(-1)}`, {

          method: 'PATCH',
          headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            "isGoodDog": !dogClicked.isGoodDog
          })
        })
      })
    })
    let dogArr = []
    for(dogs in dogList){

      dogArr.push(dogList[dogs])
    }

    let dogFil = document.getElementById("good-dog-filter")
    let goodDogs = dogArr.filter(doge => doge.isGoodDog === true)
    let badDogs = dogArr.filter(doge => doge.isGoodDog === false)

    dogFil.addEventListener('click', function(event){

      if (dogFil.innerText === "Filter good dogs: OFF"){
        dogFil.innerText = "Filter good dogs: ON"

        dogInfo.innerHTML = ""

        for (i in goodDogs){

        dogInfo.innerHTML += `
        <h2>${goodDogs[i].name}</h2>
        <img src="${goodDogs[i].image}">
        `

        }
      }
      else
      {
        dogFil.innerText = "Filter good dogs: OFF"

        dogInfo.innerHTML = ""

        for (i in badDogs){

        dogInfo.innerHTML += `
        <h2>${badDogs[i].name}</h2>
        <img src="${badDogs[i].image}">
        `
        
        }
      }
  })
})

//too lazy to add a good dog button to the filtered dogs probably wouldnt be that hard
