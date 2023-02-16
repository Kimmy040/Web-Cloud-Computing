let APIKEY = "OXqXnLlneiscmdivibmgdq12PcIMWc5u4WBO8gHl";

function searchResults(content, str) {
  const container = document.getElementById('container');
  container.replaceChildren()
  console.log(content.results);
  console.log("META", content.meta);
  if (content.results.length == 0) {
    let responseText = document.createElement("span");
    responseText.appendChild(document.createTextNode(`The movie ${str} does not exsist in the database`));
    container.appendChild(responseText)
  } else if (content.results.length > 3) {
    for (let i = 2; i > -1; i--) {
      let fig = document.createElement("figure");
      let img = document.createElement("img");
      let fc = document.createElement("figcaption");
      img.src = content.results[i].image_url;
      img.alt = content.results[i].name;
      fc.textContent = `${content.results[i].name} ${content.results[i].year}`;
      fig.appendChild(img);
      fig.appendChild(fc);
      let out = document.querySelector(".out");
      out.insertAdjacentElement("afterbegin", fig);
    }
  } else {
    for (let i = (content.results.length-1); i > -1; i--) {
      let fig = document.createElement("figure");
      let img = document.createElement("img");
      let fc = document.createElement("figcaption");
      img.src = content.results[0].image_url;
      img.alt = content.results[0].name;
      fc.textContent = `${content.results[0].name} ${content.results[0].year}`;
      fig.appendChild(img);
      fig.appendChild(fc);
      let out = document.querySelector(".out");
      out.insertAdjacentElement("afterbegin", fig);
    }
  }
  document.querySelector("#search").value = "";
}

document.addEventListener("DOMContentLoaded", init);
  function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page from reloading
        let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${APIKEY}&search_type=1&search_value=`;
        let str = document.getElementById("search").value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url)
          .then(response => response.json())
          .then(content => {searchResults(content, str)})
          .catch(err => {
            console.error(err);
          });
      });
    }