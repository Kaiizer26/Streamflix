import MovieCard from './MovieCard';

function MovieList({ movies }) {
  if (movies.length === 0) {
    return (
      <div className="bg-yellow-900 bg-opacity-50 text-yellow-200 text-center p-4 rounded-lg">
        <p className="mb-0">Aucun film trouvé. 😢</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-300">
        {movies.length} film{movies.length > 1 ? 's' : ''} trouvé{movies.length > 1 ? 's' : ''}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            year={movie.year}
            rating={movie.rating}
            poster={movie.poster}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
