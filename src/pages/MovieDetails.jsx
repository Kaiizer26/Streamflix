import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/tmdbApi';
import { useMyList } from '../context/MyListContext';

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  
  const inMyList = isInMyList(parseInt(id));

  useEffect(() => {
    async function loadMovieDetails() {
      try {
        setLoading(true);
        const details = await getMovieDetails(id);
        setMovie(details);
        setError(null);
      } catch (err) {
        setError('Impossible de charger les détails du film');
      } finally {
        setLoading(false);
      }
    }

    window.scrollTo(0, 0);
    loadMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <div className="bg-red-900 bg-opacity-50 text-red-300 p-4 rounded-lg">{error || 'Film introuvable'}</div>
        <button onClick={() => navigate(-1)} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
          Retour
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Bannière */}
      <div
        className="relative h-96 md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${movie.backdrop})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-48 relative z-10">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors mb-4"
          onClick={() => navigate(-1)}
        >
          &larr; Retour
        </button>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Colonne gauche : Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Colonne droite : Détails */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            <p className="text-lg text-gray-400 mb-4">{movie.year}</p>
            
            <div className="flex items-center mb-4">
              <span className="flex items-center text-yellow-400 font-bold text-lg">
                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                {movie.rating}/10
              </span>
              <span className="mx-3 text-gray-500">|</span>
              <span className="text-gray-300">{movie.runtime} min</span>
            </div>

            <div className="mb-6">
              {movie.genres.map((genre, index) => (
                <span key={index} className="inline-block bg-gray-700 text-gray-300 text-sm font-semibold mr-2 mb-2 px-3 py-1 rounded-full">
                  {genre}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed mb-6">{movie.overview}</p>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
                onClick={() => navigate('/player')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                </svg>
                Lecture
              </button>
              <button
                onClick={() => {
                  if (inMyList) {
                    removeFromMyList(parseInt(id));
                  } else {
                    addToMyList({
                      id: parseInt(id),
                      title: movie.title,
                      year: movie.year,
                      rating: movie.rating,
                      poster: movie.poster
                    });
                  }
                }}
                className={`font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2 ${
                  inMyList
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-white'
                }`}
              >
                {inMyList ? (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Dans ma liste
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                    </svg>
                    Ajouter à ma liste
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
