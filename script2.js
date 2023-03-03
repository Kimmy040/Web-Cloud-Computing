function setMovie(data) {
  console.log(data);
  let title = document.getElementById("title");
  title.innerHTML = data.title;
  let plot = document.getElementById("plot");
  plot.innerHTML = data.plot_overview;
  let genre = document.getElementById("genre");
  genre.innerHTML = data.genre_names;
  let rating = document.getElementById("user_rating");
  rating.innerHTML = data.user_rating;
  let year = document.getElementById("year");
  year.innerHTML = data.year;
  let platform = document.getElementById("platform");
  platform.innerHTML = data.sources; //Needs fix
  let duration = document.getElementById("duration");
  duration.innerHTML = data.runtime_minutes;
  let type = document.getElementById("type");
  type.innerHTML = data.type;
  let posterimg = document.getElementById("poster");
  posterimg.innerHTML = `<img width="100px" src="${data.poster}">`;
  let original_language = document.getElementById("original_language");
  original_language.innerHTML = data.original_language;
  let release_date = document.getElementById("release_date");
  release_date.innerHTML = data.release_date;
  let tv_show = document.getElementById("type");  
  tv_show.innerHTML = data.type;
  let runtime_minutes = document.getElementById("runtime_minutes");
  runtime_minutes.innerHTML = data.runtime_minutes;
  let similar_titles = document.getElementById("similar_titles");
  similar_titles.innerHTML = data.similar_titles;
  let format = document.getElementById("format");
  format.innerHTML = data.format;
  const similarIds = data.similar_titles;
  displaySimilarMovies(similarIds);
  
}

function displaySimilarMovies(similarIds) {
  const apiKey = "yIOIuRIvm5qFssBdLKwDsyrkCO4n8zJvADTXzBnT";
  const similarMoviesDiv = document.getElementById("similar_movies");

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
        const movieTitle = data.title;
        const moviePoster = data.poster;
        const movieLink = `movie_detail.html?id=${data.id}`;
        const movieElement = `
          <div class="similar_movie">
            <a href="${movieLink}">
              <img src="${moviePoster}" alt="${movieTitle}">
              <p>${movieTitle}</p>
            </a>
          </div>
        `;
        similarMoviesDiv.insertAdjacentHTML('beforeend', movieElement);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to fetch similar movie details');
      });
  });
}


function getMovie() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const movieId = urlParams.get('id');
  if (!movieId) {
    console.error('Missing movie ID in URL');
    alert('Missing movie ID in URL');
    return;
  }

  const apiKey = "yIOIuRIvm5qFssBdLKwDsyrkCO4n8zJvADTXzBnT";
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

