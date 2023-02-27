function setMovie(data) {
  console.log(data);
  let title = document.getElementById("title");
  title.innerHTML = data.title;
  let genre = document.getElementById("genre");
  genre.innerHTML = data.genre_names;
  let rating = document.getElementById("rating");
  rating.innerHTML = data.user_rating;
  let year = document.getElementById("year");
  year.innerHTML = data.year;
  let platform = document.getElementById("platform");
  platform.innerHTML = data.sources; //Needs fix
  let duration = document.getElementById("duration");
  duration.innerHTML = data.runtime_minutes;
  let type = document.getElementById("type");
  type.innerHTML = data.type;
  let plot = document.getElementById("plot");
  plot.innerHTML = direction(data.plot_overview);
  let posterimg = document.getElementById("poster");
  posterimg.innerHTML = `<img width="100px" src="${data.poster}">`;
  let original_language = document.getElementById("original_language");
  original_language.innerHTML = data.original_languager;
  let release_date = document.getElementById("release_date");
  release_date.innerHTML = data.release_date;
  let tv_show = document.getElementById("tv_show");  
  tv_show.innerHTML = data.tv_show;
  let user_rating = document.getElementById("user_rating");
  user_rating.innerHTML = data.user_rating;
  let runtime_minutes = document.getElementById("runtime_minutes");
  runtime_minutes.innerHTML = data.runtime_minutes;
  let similar_titles = document.getElementById("similar_titles");
  similar_titles.innerHTML = data.similar_titles;
  let format = document.getElementById("format");
  format.innerHTML = data.format;
}

function setMovie(data) {
  console.log(data);
  // Check the value of the "direction" property
  // ...
}

function getMovie(movieId) {
  let movieId="1159475"
  let apiKey = "GlgR550tZqXd7XRX5w5FXfiEbxZ1TBMbrb6ZM9Tm";
  let url = `https://api.watchmode.com/v1/title/${movieId}/details/?apiKey=${apiKey}`; //&append_to_response=sources`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setMovie(data);
      console.log(data);
    });
}
