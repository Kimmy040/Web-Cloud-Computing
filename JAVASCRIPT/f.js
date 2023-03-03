
function yo() {
    console.log("Hei")
}

function test() {
    // Define the new movie information
    console.log("Hei")
    const newMovie = {
        movieId: '1236', // replace with the actual movie ID
        poster: './IMAGES/movies.png', // replace with the URL of the movie's poster image
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