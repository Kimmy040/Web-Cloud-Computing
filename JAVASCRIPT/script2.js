
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
  posterimg.innerHTML = `<img width="800px" src="${data.poster}">`;
  let original_language = document.getElementById("original_language");
  original_language.innerHTML = data.original_language;
  let release_date = document.getElementById("release_date");
  release_date.innerHTML = data.release_date;
  let tv_show = document.getElementById("type");  
  tv_show.innerHTML = data.type;
  let runtime_minutes = document.getElementById("runtime_minutes");
  runtime_minutes.innerHTML = data.runtime_minutes;
  let format = document.getElementById("format");
  format.innerHTML = data.format;
  
  trailer(data);
}


function trailer(data){
  let trailer = document.getElementById("trailer");
  trailer.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${data.trailer.id}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
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

    fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch movie videos');
      }
      return response.json();
    })
    .then(data => {
      const trailer = data.videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (trailer) {
        const trailerId = trailer.key;
        console.log(trailerId);
        trailer({ trailer: { id: trailerId } });
      } else {
        console.log('No trailer found');
      }
    })
    .catch(err => {
      console.error(err);
      alert('Failed to fetch movie videos');
    })
}

document.addEventListener('DOMContentLoaded', function() {
  getMovie();
});

