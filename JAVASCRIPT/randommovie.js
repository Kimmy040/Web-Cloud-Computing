// This function displays the search results on the page
function randomSearchResults(randoms, str) {
  // Get the container element and replace its children
  const container = document.getElementById('container');
  container.replaceChildren()

  // Log the search results and metadata to the console
  console.log(randoms.results);
  console.log("META", randoms.meta);

  // If there are no search results, display an error message
  if (randoms.results.length == 0) {
    let responseText = document.createElement("span");
    responseText.appendChild(document.createTextNode(`The movie ${str} does not exist in the database`));
    container.appendChild(responseText)
  } else {
    // If there are search results, display up to 3 random ones
    let results = randoms.results;
    if (results.length > 3) {
      results = shuffle(results).slice(0, 3);
    }
    // Loop through the search results and create HTML elements for each one
    for (let i = 0; i < results.length; i++) {
      let fig = document.createElement("figure");
      let img = document.createElement("img");
      let fc = document.createElement("figcaption");
      // Set the image source and alt text
      img.src = randoms.results[i].image_url;
      img.alt = randoms.results[i].name;
      // If the image fails to load, replace it with a default "missing poster" image
      img.onerror = function() {
        this.src = '../IMAGES/missingposter.png'; // replace with missing poster image
      };
      // Set the text content of the caption to the movie name and year (if available)
      fc.textContent = randoms.results[i].name;
      if (randoms.results[i].year !== null) {
        fc.textContent += ` ${randoms.results[i].year}`;
      }
      // Add the image and caption to the figure element
      fig.appendChild(img);
      fig.appendChild(fc);
      // // Add an event listener to the figure element to redirect to the movieDetails page when clicked
      fig.addEventListener("click", () => {
        window.location.href = `movieDetails.html?id=${results[i].id}`;
      });
      // Add the figure element to the container
      let rout = document.querySelector(".randomoutput");
      rout.insertAdjacentElement("afterbegin", fig);
    }
  }
  // Clear the search input field
  document.querySelector("#search").value = "";
}

// This function shuffles an array using the Fisher-Yates shuffle algorithm
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

// This event listener runs when the page finishes loading
document.addEventListener("DOMContentLoaded", () => {
// List of 100 most common words in movie titles
const wordsList = 'the,of,a,and,in,to,for,with,on,at,from,by,an,is,his,her,she,him,he,they,their,them,it,that,this,be,but,or,as,up,who,out,not,one,all,into,has,are,we,was,you,me,my,your,our,can,will,love,man,woman,day,night,life,world,time,way,home,heart,mind,soul,body,death,game,war,king,queen,prince,princess,power,money,city,country,school,house,family,friends,adventure,journey,story,tale,legend,mystery,thriller,horror,comedy,drama,action,romance,fantasy,science,fiction,space,magic,force,hero,villain,battle,quest,treasure';
// Split the words list into an array of individual words
const wordsArray = wordsList.split(',');
// Generate a random index to select a word from the array
const randomIndex = Math.floor(Math.random() * wordsArray.length);
// Select a random word from the array
const randomWord = wordsArray[randomIndex];$
  // Construct the API url with the selected random word and the API key
  let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=2&search_value=${randomWord}`;
  // Log the API url to the console
  console.log(url);
  // Fetch data from the Watchmode API using the constructed url
  fetch(url)
    .then(response => response.json())
    .then(randoms => {randomSearchResults(randoms)})
    .catch(err => {
      console.error(err);
    });
});

// This event listener runs when the page finishes loading. We do this to ensure that the page has finished loading
// before attempting to manipulate the DOM and add an event listener to the shuffle button. 
document.addEventListener("DOMContentLoaded", () => {
  // Select the shuffle button and the container element from the DOM
  const shuffleButton = document.getElementById("shuffle-button");
  const container = document.getElementById("container");
  // Add an event listener to the shuffle button
  shuffleButton.addEventListener("click", () => {
  // List of 100 most common words in movie titles
  const wordsList = 'the,of,a,and,in,to,for,with,on,at,from,by,an,is,his,her,she,him,he,they,their,them,it,that,this,be,but,or,as,up,who,out,not,one,all,into,has,are,we,was,you,me,my,your,our,can,will,love,man,woman,day,night,life,world,time,way,home,heart,mind,soul,body,death,game,war,king,queen,prince,princess,power,money,city,country,school,house,family,friends,adventure,journey,story,tale,legend,mystery,thriller,horror,comedy,drama,action,romance,fantasy,science,fiction,space,magic,force,hero,villain,battle,quest,treasure';
  // Split the words list into an array of individual words
  const wordsArray = wordsList.split(',');
  // Generate a random index to select a word from the array
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  // Select a random word from the array
  const randomWord = wordsArray[randomIndex];
  // Construct the API url with the selected random word and the API key
    let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=2&search_value=${randomWord}`;
    // Log the API url to the console
    console.log(url);
    // Fetch data from the Watchmode API using the constructed url
    fetch(url)
      .then(response => response.json())
      .then(randoms => {randomSearchResults(randoms)})
      .catch(err => {
        console.error(err);
      });
  });
});


  
  