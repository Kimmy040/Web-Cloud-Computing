
function addMovie() {
    // Define the new movie information
    const newMovie = {
        movieId: '1233', // replace with the actual movie ID
        poster: 'https://cdn.watchmode.com/posters/01397224_poster_w185.jpg', // replace with the URL of the movie's poster image
        title: 'Movie Header', // replace with the actual title of the movie
        year: 2022 // replace with the actual year the movie was released
    };
    
    // Get the user's favorite movie list from local storage
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};
    
    console.log(favoriteMovies)
    // Add the new movie to the list
    favoriteMovies[newMovie.movieId] = newMovie;
    
    // Store the updated favorite movie list in local storage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));

    
}

function print() {
        // Get the user's favorite movie list from local storage
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};

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
        cardElement.appendChild(posterElement);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            deleteMovie(movie.movieId);
            cardElement.remove();
        });
        cardElement.appendChild(deleteButton);

        favoriteMoviesGridElement.appendChild(cardElement);
    })
}

function deleteMovie(movieId) {
    // Get the user's favorite movie list from local storage
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || {};
  
    // Remove the movie from the list
    delete favoriteMovies[movieId];
  
    // Store the updated favorite movie list in local storage
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }