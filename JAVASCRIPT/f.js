function print() {
        // Get the user's favorite movie list from local storage
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};

    const genreCount = {}; 
    console.log(favoriteMovies)

    // Display the list of favorite movies on the page (for example, in a grid of movie cards)
    const favoriteMoviesGridElement = document.querySelector(".output");
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
        posterElement.src = movie.poster;
        posterElement.addEventListener("click", () => {
            window.location.href = `movieDetails.html?id=${movie.movieId}`;
          });
        cardElement.appendChild(posterElement);

        

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteMovie(movie.movieId);
            cardElement.remove();
        });
        cardElement.appendChild(deleteButton);

        favoriteMoviesGridElement.appendChild(cardElement);
        
        if (movie.genre != undefined) {
            const genres = movie.genre.split(",");
            console.log(movie.genre)
            genres.forEach(genre => {
                genreCount[genre] = genreCount[genre] ? genreCount[genre] + 1 : 1;
            });
      } 
    })
    
    console.log(genreCount)
    // Create a chart using Chart.js
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

function deleteMovie(movieId) {
    // Get the user's favorite movie list from local storage
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};
  
    // Remove the movie from the list
    delete favoriteMovies[movieId];
  
    // Store the updated favorite movie list in local storage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

    print()
  }