function randomSearchResults(randoms, str) {
  const container = document.getElementById('container');
  container.replaceChildren()
  console.log(randoms.results);
  console.log("META", randoms.meta);
  if (randoms.results.length == 0) {
    let responseText = document.createElement("span");
    responseText.appendChild(document.createTextNode(`The movie ${str} does not exist in the database`));
    container.appendChild(responseText)
  } else {
    let results = randoms.results;
    if (results.length > 3) {
      results = shuffle(results).slice(0, 3);
    }
    for (let i = 0; i < results.length; i++) {
      let fig = document.createElement("figure");
      let img = document.createElement("img");
      let fc = document.createElement("figcaption");
      img.src = randoms.results[i].image_url;
      img.alt = randoms.results[i].name;
      img.onerror = function() {
        this.src = '../IMAGES/missingposter.png'; // replace with missing poster image
      };
      fc.textContent = randoms.results[i].name;
      if (randoms.results[i].year !== null) {
        fc.textContent += ` ${randoms.results[i].year}`;
      }
      fig.appendChild(img);
      fig.appendChild(fc);
      // add event listener to redirect to movieDetails.html
      fig.addEventListener("click", () => {
        window.location.href = `movieDetails.html?id=${results[i].id}`;
      });
      let rout = document.querySelector(".randomoutput");
      rout.insertAdjacentElement("afterbegin", fig);
    }
  }
  document.querySelector("#search").value = "";
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

document.addEventListener("DOMContentLoaded", () => {
  //let randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26))
  let randomLetter = 'house'
  let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=2&search_value=${randomLetter}`;
  console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(randoms => {randomSearchResults(randoms)})
    .catch(err => {
      console.error(err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const shuffleButton = document.getElementById("shuffle-button");
  const container = document.getElementById("container");

  shuffleButton.addEventListener("click", () => {
    let randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=2&search_value=${randomLetter}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(randoms => {randomSearchResults(randoms)})
      .catch(err => {
        console.error(err);
      });
  });
});


  
  