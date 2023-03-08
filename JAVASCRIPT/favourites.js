// Function that prints all favourite movies of the user
function print() {
        // Get the user's favorite movie list from local storage
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};

    const genreCount = {}; 

    const favoriteMoviesGridElement = document.querySelector(".output");

    // Display the list of favorite movies on the page, for loops create a card of each movie
    Object.values(favoriteMovies).forEach(movie => {
    const cardElement = document.createElement('div');
        cardElement.classList.add('movie-card');
        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;
        cardElement.appendChild(titleElement);

        const yearElement = document.createElement('p');
        yearElement.textContent = movie.year;
        cardElement.appendChild(yearElement);

        const posterElement = document.createElement('img');
        posterElement.src = movie.poster ? movie.poster : `../IMAGES/missingposter.png`;
        posterElement.addEventListener("click", () => {
            window.location.href = `movieDetails.html?id=${movie.movieId}`;
          });
        cardElement.appendChild(posterElement);

        
        // Add delete button that deletes the movie
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteMovie(movie.movieId);
            cardElement.remove();
        });
        cardElement.appendChild(deleteButton);

        favoriteMoviesGridElement.appendChild(cardElement);
        
        // Check if a movie have a genre, if so, update the counts of the genres
        if (movie.genre != undefined && movie.genre != "") {
            const genres = movie.genre.split(",");
            console.log(movie.genre)
            genres.forEach(genre => {
                genreCount[genre] = genreCount[genre] ? genreCount[genre] + 1 : 1;
            });
      } 
    })

    // Create a histogram of genres in favourite movies using Chart.js
    const ctx = document.getElementById("genre-chart").getContext("2d");
    const chart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: Object.keys(genreCount),
        datasets: [{
        label: "Favorite Genre by number of movies",
        data: Object.values(genreCount),
        backgroundColor: "rgba(54, 162, 235)"
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1 
                }
            }]
        }
    }
    });
}

// Function to delete a movie from local storage (retrives, deletes and sends to local storage)
function deleteMovie(movieId) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};

    delete favoriteMovies[movieId];
  
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

    // Update chart with the movie deleted
    updateChart()
  }

function updateChart() {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};

    const genreCount = {}; 

    // Count the number of occurences per genre
    Object.values(favoriteMovies).forEach(movie => {
        if (movie.genre != undefined && movie.genre != "") {
            const genres = movie.genre.split(",");
            genres.forEach(genre => {
                genreCount[genre] = genreCount[genre] ? genreCount[genre] + 1 : 1;
            });
        } 
    })
     // Re-render the chart with the updated data
  const chartData = {
    labels: Object.keys(genreCount),
    datasets: [{
      label: "Favorite Genre by number of movies",
      data: Object.values(genreCount),
      backgroundColor: "rgba(54, 162, 235)"
    }]
  };
  const chart = Chart.getChart("genre-chart");
  chart.data = chartData;
  chart.update();
}