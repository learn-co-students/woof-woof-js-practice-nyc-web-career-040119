// http://localhost:3000/pups

document.addEventListener("DOMContentLoaded", function(){

  const dogBar = document.querySelector("#dog-bar");
  const dogInfo = document.querySelector("#dog-info");


  fetch('http://localhost:3000/pups')
    .then(function(res){
      return res.json();
    })
    .then(function(dogs){
      console.log(dogs);

      for (dog of dogs){

        // RENDERING DOG BUTTONS IN DOG-BAR
        dogBar.innerHTML += `
          <span id=${dog.id} style="text-align:center">${dog.name}</span>
        `

        // DISPLAY SELECTED DOG BUTTON
        dogBar.addEventListener("click", function(e){
          dogInfo.innerHTML = "";

          let dogId = e.target.id
          let theDog = dogs[`${dogId}` - 1]

          const img = document.createElement("img");
          const h2 = document.createElement("h2");
          const button = document.createElement("button");
          let goodDog = theDog.isGoodDog;

          img.src = theDog.image;
          h2.innerText = theDog.name;
          button.id = "goodDogBtn";

          if (theDog.isGoodDog === true) {
            button.innerText = "Good Dog!";
          } else {
            button.innerText = "Bad Dog!"
          }

          dogInfo.appendChild(img);
          dogInfo.appendChild(h2);
          dogInfo.appendChild(button);


          // GOOD DOG TOGGLE BUTTON
          const goodDogBtn = document.querySelector("#goodDogBtn");

          button.addEventListener("click", function(){

            goodDog = !goodDog

            if (goodDog) {
              button.innerText = "Good Dog!"
            } else {
              button.innerText = "Bad Dog!"
            }; // END OF IF ELSE STATEMENT


            fetch(`http://localhost:3000/pups/${theDog.id}`, {
              method: "PATCH",
              headers:{
                'Content-Type': 'application/json',
                accept: 'application/json'
              },
              body: JSON.stringify({
                isGoodDog: goodDog
              })
            })
              .then(function(r){
                return r.json();
              })
              .then(function(d){
                console.log(d)

              }); // END OF PATCH FETCH

          }); // END OF GOOD DOG BUTTON

        }); // END OF DISPLAY SELECTED DOG BUTTON

      }; // END OF DOG ITERATION

    }); // END OF GET FETCH

}); // END OF DOM LOAD
