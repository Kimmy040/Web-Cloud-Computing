//let movieId;

function setMovie(data) {
  console.log(data);
  let title = document.getElementById("title");
  title.innerHTML = data.title;
  /*let original_title = document.getElementById("original_title");
  if (data.original_title == data.title){
    original_title.innerHTML = "";
  } else {
    original_title.innerHTML = data.original_title;
  }*/
  let plot = document.getElementById("plot");
  plot.innerHTML = data.plot_overview;
  let genre = document.getElementById("genre");
  genre.innerHTML = data.genre_names ? data.genre_names : "Unknown";
  let rating = document.getElementById("rating");
  rating.innerHTML = data.user_rating ? data.user_rating : "Unknown";
  let critic_score = document.getElementById("critic_score");
  critic_score.innerHTML = data.critic_score ? data.critic_score : "Unknown";
  let year = document.getElementById("year");
  year.innerHTML = data.year ? data.year : "Unknown";
  //let platform = document.getElementById("platform");
  //platform.innerHTML = data.sources; //Needs fix
  let duration = document.getElementById("duration");
  duration.innerHTML = data.runtime_minutes ? data.runtime_minutes : "Unknown";
  let type = document.getElementById("type");
  type.innerHTML = data.type ? data.type : "Unknown";
  let posterimg = document.getElementById("poster");
  posterimg.innerHTML = data.poster ? `<img width="800px" id="posterimg" src="${data.poster}">` : `<img width="800px" src="../IMAGES/missingposter.png">`;
  let original_language = document.getElementById("original_language");
  original_language.innerHTML = data.original_language ? data.original_language : "Unknown";
  let release_date = document.getElementById("release_date");
  release_date.innerHTML = data.release_date ? data.release_date : "Unknown";
  let tv_show = document.getElementById("type");  
  tv_show.innerHTML = data.type ? data.type : "Unknown";
  similarTitles = data.similar_titles
  if (Object.is(similarTitles, null)) {
    const similarMoviesGridElement = document.querySelector(".similarTitles")
    const textElement = document.createElement('p');
    textElement.textContent = "No similar movies found";
    similarMoviesGridElement.appendChild(textElement);
  } else if (similarTitles.lenght < 5) {
    //displaySimilarMovies(similarTitles)
  } else {
   // displaySimilarMovies(similarTitles.slice(0, 5))
  }
  //let format = document.getElementById("format"); //Needs to connect to sources
  //format.innerHTML = data.sources.format ? data.sources.format : "Undefined";

  platform(data)
  //Call the trailer function
  trailer(data);

  //Call the cast_crew function
  cast_crew(data);

}

function displaySimilarMovies(similarIds) {
  const apiKey = "jbyWkfuAOD1sO9iLlNi29PV4Wf1Uok9rcM8yzwgO";

  similarIds.forEach(id => {console.log(id)})
  const similarMoviesGridElement = document.querySelector(".similarTitles");


  similarIds.forEach(id => {
    const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}`;
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch similar movie details');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
          console.log(data)
          const cardElement = document.createElement('div');
          cardElement.classList.add('movie-card');
          cardElement.style.width = '10rem';
          cardElement.style.display = 'inline-block';
          cardElement.style.alignItems = 'center';


          const titleElement = document.createElement('h3');
          titleElement.textContent = data.title;
          cardElement.appendChild(titleElement);

          const yearElement = document.createElement('p');
          yearElement.textContent = data.year;
          cardElement.appendChild(yearElement);

          const posterElement = document.createElement('img');
          posterElement.src = data.poster;
          posterElement.addEventListener("click", () => {
              window.location.href = `movieDetails.html?id=${data.id}`;
            });
          cardElement.appendChild(posterElement);

          similarMoviesGridElement.appendChild(cardElement);

        })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch similar movie details');
      });
  });
}



function trailer(data){
  let trailer = document.getElementById("trailer");
  const splitUrl = data.trailer.split("v=")
  const youtubeId = splitUrl[1]
  if (data.trailer == ""){
    trailer.innerHTML = ""
  } else {
    trailer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
  } 
}

function platform(data) {
  console.log(data.sources)
  let output = document.getElementById("platform"); 
  let platforms = '';
  data.sources.forEach(platform => {
    if (platform.type == "sub") {
      if (platforms !== '') {
        platforms += ', ';
      }
      platforms += `<a href="${platform.web_url}" target="_blank">${platform.name}</a>`;
    }
  });
  output.innerHTML = platforms;
}

function cast_crew(data){
  console.log(data.cast_crew)
  const cast = data.cast_crew.filter(item => item.type == "Cast");
  const crew = data.cast_crew.filter(item => item.type == "Crew");

  //Create a table
  let castTable = "<table><tr><th>Name</th><th>Role</th><th>Headshot</th></tr>";
  //Loop through the cast array
  cast.slice(0,4).forEach(item => {
    let headshotSrc = item.headshot_url;
    if (headshotSrc === "https://cdn.watchmode.com/profiles/empty_headshot.jpg"){
      headshotSrc = "../IMAGES/missingposter.png"; 
    }
    castTable += `<tr><td>${item.full_name || "unknown"}</td><td>${item.role || "unknown"}</td><td><img src="${headshotSrc}" width="150px" height="150px"></td></tr>`;
  });
  castTable += "</table>" ;
  document.getElementById("cast").innerHTML = castTable;

  //Create a table
  let crewTable = "<table><tr><th>Name</th><th>Role</th><th>Headshot</th></tr>";
  //Loop through the crew array
  crew.slice(0,4).forEach(item => {
    let headshotSrc = item.headshot_url;
    if (headshotSrc === "https://cdn.watchmode.com/profiles/empty_headshot.jpg"){
      headshotSrc = "../IMAGES/missingposter.png"; 
    }
    crewTable += `<tr><td>${item.full_name || "unknown"}</td><td>${item.role || "unknown"}</td><td><img src="${headshotSrc}" width="150px" height="150px"></td></tr>`;
    });
  crewTable += "</table>";
  document.getElementById("crew").innerHTML = crewTable;
  
}



function checkFavorites(movieId){
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};
  const starImg = document.querySelector('#star');

  if (movieId in favoriteMovies) {
    // Movie is in favorites, change image to yellow star
    starImg.src = '../IMAGES/yellow-star.png';
  } else {
    // Movie is not in favorites, change image to white star
    starImg.src = '../IMAGES/empty-star.png';
  }
}

function addMovie() {
  // Define the new movie information
  let poster = document.getElementById('posterimg').src
  let title = document.getElementById('title').textContent
  let year = document.getElementById('year').textContent
  let genre = document.getElementById('genre').textContent

  const newMovie = {
      movieId: movieId,
      poster: poster, 
      title: title, 
      year: year,
      genre: genre 
  };
  
  // Get the user's favorite movie list from local storage
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};

  if (movieId in favoriteMovies) {
    // Remove the movie from the list
    delete favoriteMovies[movieId];
  } else {
    // Add the new movie to the list
  favoriteMovies[newMovie.movieId] = newMovie;
  }
  
  // Store the updated favorite movie list in local storage
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));  
  
  checkFavorites(movieId)
}


function getMovie() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  movieId = urlParams.get('id');
  if (!movieId) {
    console.error('Missing movie ID in URL');
    alert('Missing movie ID in URL');
    return;
  }

  const apiKey = "jbyWkfuAOD1sO9iLlNi29PV4Wf1Uok9rcM8yzwgO";
  const url = `https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${apiKey}&append_to_response=cast-crew,sources`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      return response.json();
    })
    .then(data => {
      setMovie(data);
      checkFavorites(movieId)
    })
    .catch(err => {
      console.error(err);
      alert('Failed to fetch movie details');
    });
}

//document.addEventListener('DOMContentLoaded', function() {
//  getMovie();
// });

