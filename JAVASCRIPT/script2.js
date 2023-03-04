let movieId;

function setMovie(data) {
  console.log(data);
  let title = document.getElementById("title");
  title.innerHTML = data.title;
  let plot = document.getElementById("plot");
  plot.innerHTML = data.plot_overview;
  let genre = document.getElementById("genre");
  genre.innerHTML = data.genre_names ? data.genre_names : "Undefined";
  let rating = document.getElementById("rating");
  rating.innerHTML = data.user_rating ? data.user_rating : "Undefined";
  let critic_score = document.getElementById("critic_score");
  critic_score.innerHTML = data.critic_score ? data.critic_score : "Undefined";
  let year = document.getElementById("year");
  year.innerHTML = data.year ? data.year : "Undefined";
  //let platform = document.getElementById("platform");
  //platform.innerHTML = data.sources; //Needs fix
  let duration = document.getElementById("duration");
  duration.innerHTML = data.runtime_minutes ? data.runtime_minutes : "Undefined";
  let type = document.getElementById("type");
  type.innerHTML = data.type ? data.type : "Undefined";
  let posterimg = document.getElementById("poster");
  posterimg.innerHTML = `<img width="800px" src="${data.poster}">` ? `<img width="800px" id="posterimg" src="${data.poster}">` : `<img width="800px" src="../IMAGES/missingposter.png">`;
  let original_language = document.getElementById("original_language");
  original_language.innerHTML = data.original_language ? data.original_language : "Undefined";
  let release_date = document.getElementById("release_date");
  release_date.innerHTML = data.release_date ? data.release_date : "Undefined";
  let tv_show = document.getElementById("type");  
  tv_show.innerHTML = data.type ? data.type : "Undefined";
  //let format = document.getElementById("format"); //Needs to connect to sources
  //format.innerHTML = data.sources.format ? data.sources.format : "Undefined";
  
  //Call the trailer function
  trailer(data);

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



function addMovie() {
  // Define the new movie information
  let poster = document.getElementById('posterimg').src
  let title = document.getElementById('title').textContent
  let year = document.getElementById('year').textContent

  const newMovie = {
      movieId: movieId,
      poster: poster, 
      title: title, 
      year: year 
  };
  
  // Get the user's favorite movie list from local storage
  const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};
  
  console.log(newMovie)
  // Add the new movie to the list
  favoriteMovies[newMovie.movieId] = newMovie;
  
  // Store the updated favorite movie list in local storage
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));    
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

  const apiKey = "GlgR550tZqXd7XRX5w5FXfiEbxZ1TBMbrb6ZM9Tm";
  const url = `https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch movie details');
      }
      return response.json();
    })
    .then(data => {
      setMovie(data);
    })
    .catch(err => {
      console.error(err);
      alert('Failed to fetch movie details');
    });
}

document.addEventListener('DOMContentLoaded', function() {
  getMovie();
});

