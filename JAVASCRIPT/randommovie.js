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
// List of 100 most common words in movie titles
const wordsList = 'the,of,a,and,in,to,for,with,on,at,from,by,an,is,his,her,she,him,he,they,their,them,it,that,this,be,but,or,as,up,who,out,not,one,all,into,has,are,we,was,you,me,my,your,our,can,will,love,man,woman,day,night,life,world,time,way,home,heart,mind,soul,body,death,game,war,king,queen,prince,princess,power,money,city,country,school,house,family,friends,adventure,journey,story,tale,legend,mystery,thriller,horror,comedy,drama,action,romance,fantasy,science,fiction,space,magic,force,hero,villain,battle,quest,treasure';
const wordsArray = wordsList.split(',');
const randomIndex = Math.floor(Math.random() * wordsArray.length);
const randomWord = wordsArray[randomIndex];
  let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=2&search_value=${randomWord}`;
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
    // List of 100 most common words in movie titles
  const wordsList = 'the,of,a,and,in,to,for,with,on,at,from,by,an,is,his,her,she,him,he,they,their,them,it,that,this,be,but,or,as,up,who,out,not,one,all,into,has,are,we,was,you,me,my,your,our,can,will,love,man,woman,day,night,life,world,time,way,home,heart,mind,soul,body,death,game,war,king,queen,prince,princess,power,money,city,country,school,house,family,friends,adventure,journey,story,tale,legend,mystery,thriller,horror,comedy,drama,action,romance,fantasy,science,fiction,space,magic,force,hero,villain,battle,quest,treasure';
  const wordsArray = wordsList.split(',');
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  const randomWord = wordsArray[randomIndex];
    let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=2&search_value=${randomWord}`;
    console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(randoms => {randomSearchResults(randoms)})
      .catch(err => {
        console.error(err);
      });
  });
});


  
  