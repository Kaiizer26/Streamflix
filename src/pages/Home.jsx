import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { getPopularMovies, getGenres, getMoviesByGenre, getMovieDetails } from '../services/tmdbApi';
import { useMyList } from '../context/MyListContext';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  const navigate = useNavigate();

  // Charger les films populaires, les genres et le film en vedette au démarrage
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [popularMovies, genresList] = await Promise.all([
          getPopularMovies(),
          getGenres()
        ]);
        setMovies(popularMovies);
        setGenres(genresList);
        
        // Charger les détails du premier film comme film vedette
        if (popularMovies.length > 0) {
          const featured = await getMovieDetails(popularMovies[0].id);
          setFeaturedMovie(featured);
        }
        
        setError(null);
      } catch (err) {
        setError('Impossible de charger les données');
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Filtrer par genre
  useEffect(() => {
    if (!selectedGenre) return;

    async function loadMoviesByGenre() {
      try {
        setLoading(true);
        const results = await getMoviesByGenre(selectedGenre);
        setMovies(results);
        setError(null);
      } catch (err) {
        setError('Erreur lors du filtrage');
      } finally {
        setLoading(false);
      }
    }

    loadMoviesByGenre();
  }, [selectedGenre]);

  const handleGenreChange = async (e) => {
    const genreId = e.target.value;
    setSelectedGenre(genreId);
    
    if (!genreId) {
      // Recharger les films populaires
      try {
        setLoading(true);
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        setError('Impossible de charger les films');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToList = () => {
    if (featuredMovie) {
      if (isInMyList(featuredMovie.id)) {
        removeFromMyList(featuredMovie.id);
      } else {
        addToMyList(featuredMovie);
      }
    }
  };

  const handlePlay = () => {
    if (featuredMovie) {
      navigate(`/player/${featuredMovie.id}`);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Banner */}
      {featuredMovie && (
        <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
          {/* Image de fond */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${featuredMovie.backdrop})`,
            }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
          </div>

          {/* Contenu du Hero */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {featuredMovie.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-4 text-sm md:text-base">
                <span className="flex items-center gap-1">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {featuredMovie.rating}
                </span>
                <span>{featuredMovie.year}</span>
                <span>{featuredMovie.runtime} min</span>
              </div>

              <p className="text-base md:text-lg mb-6 line-clamp-3 text-gray-300">
                {featuredMovie.overview}
              </p>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Bouton Lecture */}
                <button 
                  onClick={handlePlay}
                  className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-all"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Lecture
                </button>

                {/* Bouton Ajouter à ma liste */}
                <button 
                  onClick={handleAddToList}
                  className="flex items-center gap-2 bg-gray-700/80 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isInMyList(featuredMovie.id) ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    )}
                  </svg>
                  {isInMyList(featuredMovie.id) ? 'Dans ma liste' : 'Ma liste'}
                </button>

                {/* Bouton Aimé */}
                <button 
                  onClick={handleLike}
                  className="flex items-center justify-center w-12 h-12 bg-gray-700/80 text-white rounded-full hover:bg-gray-600 transition-all"
                >
                  <svg 
                    className="w-6 h-6" 
                    fill={isLiked ? "currentColor" : "none"} 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                    />
                  </svg>
                </button>
              </div>

              {/* Genres */}
              {featuredMovie.genres && featuredMovie.genres.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {featuredMovie.genres.map((genre, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-gray-800/80 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Section Films */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-0 text-center md:text-left">
            {selectedGenre ? genres.find(g => g.id === parseInt(selectedGenre))?.name : 'Films Populaires'}
          </h2>
          <div className="relative w-full md:w-64">
            <select 
              className="appearance-none w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
              value={selectedGenre} 
              onChange={handleGenreChange}
            >
              <option value="">Tous les genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        {loading && <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div></div>}
        {error && <div className="text-center text-red-500 text-xl bg-red-900 bg-opacity-50 p-4 rounded-lg">{error}</div>}
        {!loading && !error && <MovieList movies={movies} />}
      </div>
    </div>
  );
}

export default Home;
