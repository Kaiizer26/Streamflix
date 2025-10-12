const API_KEY = '08a341931ab5f5dcee467baeb4a68c76';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

// Récupérer les films populaires
export async function getPopularMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`
    );
    const data = await response.json();

    // Transformer les données pour notre format
    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average.toFixed(1),
      poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
      overview: movie.overview
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    return [];
  }
}

// Rechercher des films
export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=fr-FR&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A',
      rating: movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A',
      poster: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Image',
      overview: movie.overview
    }));
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    return [];
  }
}

// Récupérer les détails d'un film
export async function getMovieDetails(movieId) {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=fr-FR&append_to_response=credits`
    );
    const movie = await response.json();

    return {
      id: movie.id,
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average.toFixed(1),
      poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
      backdrop: movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null,
      overview: movie.overview,
      genres: movie.genres.map(g => g.name),
      runtime: movie.runtime,
      cast: movie.credits.cast.slice(0, 10).map(actor => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        photo: actor.profile_path ? `${IMAGE_BASE_URL}${actor.profile_path}` : 'https://via.placeholder.com/200x300?text=No+Photo'
      }))
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des détails:', error);
    return null;
  }
}

// Récupérer les genres
export async function getGenres() {
  try {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=fr-FR`
    );
    const data = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Erreur lors de la récupération des genres:', error);
    return [];
  }
}

// Récupérer des films par genre
export async function getMoviesByGenre(genreId) {
  try {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=fr-FR&with_genres=${genreId}&sort_by=popularity.desc`
    );
    const data = await response.json();

    return data.results.map(movie => ({
      id: movie.id,
      title: movie.title,
      year: new Date(movie.release_date).getFullYear(),
      rating: movie.vote_average.toFixed(1),
      poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
      overview: movie.overview
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des films par genre:', error);
    return [];
  }
}
