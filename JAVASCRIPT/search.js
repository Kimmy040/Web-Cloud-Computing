// Assign the API key to a variable
let APIKEY = "PhQy7OxxJ88X4C5tEa7RVjcIr9L74tUar2lQu6Pk";

// Function that displays search results in the container element
function searchResults(content, str) {
  // Select the container element from the DOM and clear its children
  const container = document.getElementById('container');
  container.replaceChildren()

  // Log the search results and meta data to the console for debugging purposes
  console.log(content.results);
  console.log("META", content.meta);

  // If no search results are returned, display a message indicating that the movie doesn't exist in the database
  if (content.results.length == 0) {
    let responseText = document.createElement("span");
    responseText.classList.add("error-message"); // add class name for css
    responseText.appendChild(document.createTextNode(`Sorry, the movie ${str} does not exist in the database.`));
    container.appendChild(responseText)
  }
  // If more than 3 search results are returned, display the first 3 results with image and captions
  else if (content.results.length > 3) {
    // Create figure, image, and caption elements
    // First and therefore most relevant search result is displayed first when adding the search results to the container element
    for (let i = 2; i > -1; i--) {
      let fig = document.createElement("figure");
      let img = document.createElement("img");
      let fc = document.createElement("figcaption");

      // Set the image source and alt attributes, and add an error handler to replace the image with a missing poster image if it fails to load
      img.src = content.results[i].image_url;
      img.alt = content.results[i].name;
      img.onerror = function() {
        this.src = '../IMAGES/missingposter.png'; // Replace with missing poster image
      };

      // Set the caption text to the movie name and year (if available)
      fc.textContent = content.results[i].name;
      if (content.results[i].year !== null) {
        fc.textContent += ` ${content.results[i].year}`;
      }

      // Append the image and caption to the figure element, and add an event listener to redirect to the movie details page when clicked
      fig.appendChild(img);
      fig.appendChild(fc);
      // Add event listener to redirect to movieDetails.html
      fig.addEventListener("click", () => {
        window.location.href = `movieDetails.html?id=${content.results[i].id}`;
      });

      // Select the output element from the DOM and insert the figure element at the beginning
      let out = document.querySelector(".output");
      out.insertAdjacentElement("afterbegin", fig);
    }
  }
  // If less than 3 but more than 0 search results are returned, display the first i results with image and captions
  else {
    // First and therefore most relevant search result is displayed first when adding the search results to the container element
    for (let i = (content.results.length-1); i > -1; i--) {
      // Create figure, image, and caption elements
      let fig = document.createElement("figure");
      let img = document.createElement("img");
      let fc = document.createElement("figcaption");

      // Set the image source and alt attributes, and add an error handler to replace the image with a missing poster image if it fails to load
      img.src = content.results[0].image_url;
      img.alt = content.results[0].name;
      img.onerror = function() {
        this.src = '../IMAGES/missingposter.png'; // Replace with missing poster image
      };

      // Set the caption text to the movie name and year (if available)
      fc.textContent = content.results[i].name;
      if (content.results[0].year !== null) {
        fc.textContent += ` ${content.results[0].year}`;
      }
      // Append the image and caption to the figure element, and add an event listener to redirect to the movie details page when clicked
      fig.appendChild(img);
      fig.appendChild(fc);
      // Add event listener to redirect to movieDetails.html
      fig.addEventListener("click", () => {
        window.location.href = `movieDetails.html?id=${content.results[0].id}`;
      });

      // Select the output element from the DOM and insert the figure element at the beginning
      let out = document.querySelector(".output");
      out.insertAdjacentElement("afterbegin", fig);
    }
  }
  // Clear the text that was previously entered in the input field
  document.querySelector("#search").value = "";
}

// Listen for the "DOMContentLoaded" event, which indicates that the initial HTML document has been completely loaded and parsed
document.addEventListener("DOMContentLoaded", init);
  // Define the "init" function that will be called when the "DOMContentLoaded" event is triggered
  function init() {
    // Add an event listener to the search button
    document.getElementById("btnSearch").addEventListener("click", ev => {
        // Prevent the default form submission behavior, which would cause the page to reload
        ev.preventDefault();
        let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=2&search_value=`;
        // Get the search query entered by the user, remove leading and trailing whitespace
        let str = document.getElementById("search").value.trim(); 
        // Append the search query to the API URL
        url = url.concat(str); 
        console.log(url);
        // Send a GET request to the Watchmode API with the constructed URL, and handle the response asynchronously
        fetch(url)
          // Convert the response to a JSON object
          .then(response => response.json()) 
          // Call the "searchResults" function with the search results and query string as arguments
          .then(content => {searchResults(content, str)}) 
          .catch(err => {
            console.error(err);
          });
      });
    }