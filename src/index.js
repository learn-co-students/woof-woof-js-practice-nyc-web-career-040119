document.addEventListener("DOMContentLoaded",function(){
  console.log("DOM IS DONE LOADING, GET TO WORK")
  const filter = document.querySelector("#good-dog-filter")
  const dogBar = document.querySelector("#dog-bar")

  const show = function(dog){
    //show icon
    const dogCard = document.createElement("span")
    dogCard.innerText = dog.name
    dogBar.appendChild(dogCard)

    dogCard.addEventListener("click",function(){

      const dogInfo = document.querySelector('#dog-info')
      dogInfo.innerText = "" //clears out old dog info

      const infoName = document.createElement("h2")
      infoName.innerText = dog.name
      dogInfo.appendChild(infoName)

      const infoImage = document.createElement("img")
      infoImage.src = dog.image
      dogInfo.appendChild(infoImage)

      const infoIsGoodDog = document.createElement("button")
      if(dog.isGoodDog){
        infoIsGoodDog.innerText = "Good Dog!"
      }else{
        infoIsGoodDog.innerText = "Bad Dog!"
      }

      infoIsGoodDog.addEventListener("click",function(){
        // debugger
        // console.log(dog.isGoodDog)
        // console.log("before api req")
        fetch(`http://localhost:3000/pups/${dog.id}`, {
          method:"PATCH",
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify({isGoodDog: !dog.isGoodDog}),
        })
        .then(function(){
        dog.isGoodDog = !dog.isGoodDog
        // console.log(dog.isGoodDog)
        if(dog.isGoodDog){
          infoIsGoodDog.innerText = "Good Dog!"
        }else{
          infoIsGoodDog.innerText = "Bad Dog!"
        }})
      })
      dogInfo.appendChild(infoIsGoodDog)
    })

  }

  var loadBar = fetch("http://localhost:3000/pups")
    .then(res => {return res.json()})
    .then(function(dogs){

      dogs.forEach(show)

    })

  filter.addEventListener("click",function(e){
    if( filter.innerText === "Filter good dogs: OFF") {
        filter.innerText = "Filter good dogs: ON"
        fetch("http://localhost:3000/pups")
            .then(res => {return res.json()})
            .then(function(dogs){
          const goodDogs = dogs.filter(function(dog){
            return dog.isGoodDog
          })
          dogBar.innerText = ""
          goodDogs.forEach(show)
      })
    }else {
      // console.log("turning filter off")
      filter.innerText = "Filter good dogs: OFF"
      fetch("http://localhost:3000/pups")
        .then(res => {return res.json()})
        .then(function(dogs){
          dogBar.innerText = ""
          dogs.forEach(show)

        })
    }

  })
}) // end of DOMContentLoaded
