

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

      console.log(temperment)



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



      dogInfo.appendChild(button)

      // let btnFind = document.querySelector(button)
      // console.log(btnFind)

      button.addEventListener('click', function(event){
        console.log(button)


        if (button.innerText === "Good Dog!"){
          button.innerText = "Bad Dog!"
        }
        else if (button.innerText === "Bad Dog!"){
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
        console.log(buttonCid)
      })
    })
  })
