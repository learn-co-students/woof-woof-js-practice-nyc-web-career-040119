const grab = (sel) => document.querySelector(sel);

const addToDOMAtLoc = (eltType, eltText, loc) => {
  newElt = document.createElement(eltType);
  newElt.innerText = eltText;

  loc.appendChild(newElt);

  return newElt;
};

document.addEventListener("DOMContentLoaded", () => {
  const goodDogBtn = grab("#good-dog-filter");
  const dogBar = grab("#dog-bar");
  const dogInfo = grab("#dog-info");

  fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(pupsArr => { // BEGIN SECOND .then ////////////////////
      for (const pupObj of pupsArr) { // BEGIN for ////////////////////
        const dogSpan = addToDOMAtLoc("span", pupObj.name, dogBar);
        dogSpan.isGoodDog = pupObj.isGoodDog;

        dogSpan.addEventListener("click", () => {
          dogInfo.innerHTML = `
            <img src=${pupObj.image}>
            <h2>${pupObj.name}</h2>
          `;

          const goodDogStr = pupObj.isGoodDog ? "Good Dog!" : "Bad Dog!";
          const goodDogBtn = addToDOMAtLoc("button", goodDogStr, dogInfo);

          goodDogBtn.addEventListener("click", () => {
            fetch(`http://localhost:3000/pups/${pupObj.id}`, {
              method: "PATCH",
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body: JSON.stringify({
                isGoodDog: !pupObj.isGoodDog
              })
            })
              .then(resp => resp.json())
              .then(pupWithUpdatedGoodness => {
                // LOOK UP IN SCOPE CHAIN AND UPDATE GOODNESS OF pupObj AND dogSpan //////////
                pupObj.isGoodDog = pupWithUpdatedGoodness.isGoodDog;
                dogSpan.isGoodDog = !dogSpan.isGoodDog;
                if (!showingBadDogs) {
                  //ONLY REMOVES dogSpan FROM dogBar IF NOT SHOWING GOOD DOGS //////////
                  dogSpan.style.display === "" ? dogSpan.style.display = "none" : dogSpan.style.display = ""
                }
                goodDogBtn.innerText = pupObj.isGoodDog ? "Good Dog!" : "Bad Dog!";
            });
          });
        });
      } // END for ////////////////////
  }); // END SECOND .then ////////////////////

  let showingBadDogs = true;

  goodDogBtn.addEventListener("click", (e) => {
    showingBadDogs = !showingBadDogs
    goodDogBtn.innerText = `Filter good dogs: ${showingBadDogs ? "OFF" : "ON"}`
    for (const dogSpan of dogBar.children) {
      if (!showingBadDogs) {
        // HIDES ALL BAD DOGS IF FILTER ON //////////
        !dogSpan.isGoodDog ? dogSpan.style.display = "none" : null
      } else {
        // SHOWS ALL DOGS GOOD OR BAD IF FILTER OFF //////////
        dogSpan.style.display = "";
      }
    }
  })
});
