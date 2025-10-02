const API_KEY = '3d10e6beb89479da289021883acf77f1';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

async function getMovieWithFetch(movieId) {
    try {

        // Requête vers l'API
        const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`);
        
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`); 
        }

        const movie = await response.json();

        displayMovieInfo(movie);

        return movie;

    } catch (error) {
        console.error('Erreur lors de la récupération du film:', error);
        showError(`Erreur: ${error.message}`);
    } finally {
    }

}

function displayMovieInfo(movie) {
    document.getElementById('movie-title').textContent = movie.title;
    document.getElementById('movie-overview').textContent = movie.overview;
    document.getElementById('vote-average').textContent = '⭐' + movie.vote_average;
    document.getElementById('movie-poster').src = IMAGE_BASE_URL + movie.poster_path;
    console.log(movie);
}

getMovieWithFetch(5); 
