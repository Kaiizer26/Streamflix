import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMyList } from '../context/MyListContext';

function MovieCard({ id, title, year, rating, poster }) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { addToMyList, removeFromMyList, isInMyList } = useMyList();
  
  const inMyList = isInMyList(id);

  const handleLike = (e) => {
    e.preventDefault(); // Empêcher la navigation lors du clic
    e.stopPropagation(); // Empêcher la propagation à la Link parente
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleAddToList = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inMyList) {
      removeFromMyList(id);
    } else {
      addToMyList({ id, title, year, rating, poster });
    }
  };

  return (
    <Link to={`/movie/${id}`} className="group">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-red-600/50 transition-all duration-300 transform hover:-translate-y-2">
        <img
          src={poster}
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white truncate group-hover:text-red-500 transition-colors duration-300">{title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-400">{year}</span>
            <span className="flex items-center text-sm font-semibold text-yellow-400">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
              {rating}/10
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                isLiked 
                  ? 'bg-red-600 text-white hover:bg-red-700' 
                  : 'bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white'
              }`}
              onClick={handleLike}
            >
              {isLiked ? '❤️' : '🤍'} ({likes})
            </button>
            <button
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 ${
                inMyList
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-700 text-gray-300 hover:bg-green-600 hover:text-white'
              }`}
              onClick={handleAddToList}
            >
              {inMyList ? '✓ Ma liste' : '+ Ma liste'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
