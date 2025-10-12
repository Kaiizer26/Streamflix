import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { searchMovies } from '../services/tmdbApi';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fermer les résultats quand on clique en dehors
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recherche avec debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim().length > 0) {
        setIsSearching(true);
        try {
          const results = await searchMovies(searchQuery);
          setSearchResults(results.slice(0, 5)); // Limiter à 5 résultats
          setShowResults(true);
        } catch (error) {
          console.error('Erreur de recherche:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // Attendre 300ms après la dernière frappe

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleMovieClick = (movieId) => {
    setSearchQuery('');
    setShowResults(false);
    setIsMenuOpen(false);
    navigate(`/movie/${movieId}`);
  };

  const navigationLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/films', label: 'Films' },
    { path: '/series', label: 'Séries' },
    { path: '/ma-liste', label: 'Ma Liste' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/todos', label: 'Todos' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-900 to-black text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link className="flex items-center space-x-2 hover:opacity-80 transition-opacity" to="/">
            <img 
              src="/logo.png" 
              alt="StreamFlix Logo" 
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/50' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
                to={link.path}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Barre de recherche et Profil Desktop */}
          <div className="hidden lg:flex items-center space-x-4">
            <div ref={searchRef} className="relative">
              {/* Barre de recherche */}
              <div className="relative w-full md:w-64">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Rechercher un film..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              
              {/* Résultats de recherche */}
              {showResults && (
                <div className="absolute top-full mt-2 w-96 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50 max-h-96 overflow-y-auto">
                  {isSearching ? (
                    <div className="px-4 py-8 text-center text-gray-400">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                      <p className="mt-2">Recherche en cours...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => handleMovieClick(movie.id)}
                          className="w-full px-4 py-3 hover:bg-gray-700 transition-colors duration-150 flex items-start space-x-3 text-left"
                        >
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-12 h-18 object-cover rounded shadow-lg"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium truncate">{movie.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-sm text-gray-400">{movie.year}</span>
                              <span className="text-sm text-yellow-500 flex items-center">
                                ⭐ {movie.rating}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2 mt-1">
                              {movie.overview || 'Pas de description disponible'}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-400">
                      <svg className="w-12 h-12 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p>Aucun film trouvé</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Dropdown Profil */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center font-bold shadow-lg">
                  U
                </div>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
                  <div className="py-1">
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150 flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Mon Compte</span>
                    </button>
                    <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-150 flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Paramètres</span>
                    </button>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors duration-150 flex items-center space-x-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bouton Menu Mobile */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white p-2"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 border-t border-gray-800">
          <div className="px-4 pt-4 pb-3 space-y-2">
            {/* Barre de recherche Mobile */}
            <div className="mb-4 relative">
              <div className="relative w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <input
                  type="text"
                  className="w-full py-2 pl-10 pr-4 text-white bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                  placeholder="Rechercher un film..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
              
              {/* Résultats de recherche Mobile */}
              {showResults && (
                <div className="absolute top-full mt-2 w-full bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-50 max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <div className="px-4 py-8 text-center text-gray-400">
                      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                      <p className="mt-2">Recherche en cours...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div className="py-2">
                      {searchResults.map((movie) => (
                        <button
                          key={movie.id}
                          onClick={() => handleMovieClick(movie.id)}
                          className="w-full px-3 py-3 hover:bg-gray-700 transition-colors duration-150 flex items-start space-x-3 text-left"
                        >
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-10 h-15 object-cover rounded shadow-lg flex-shrink-0"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/500x750?text=No+Image';
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium text-sm truncate">{movie.title}</h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="text-xs text-gray-400">{movie.year}</span>
                              <span className="text-xs text-yellow-500 flex items-center">
                                ⭐ {movie.rating}
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-400">
                      <svg className="w-10 h-10 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <p className="text-sm">Aucun film trouvé</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Navigation Links Mobile */}
            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {/* Profil Mobile */}
            <div className="border-t border-gray-800 pt-3 mt-3">
              <div className="flex items-center space-x-3 px-4 py-2 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center font-bold shadow-lg">
                  U
                </div>
                <span className="text-white font-medium">Utilisateur</span>
              </div>
              <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors duration-150 flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Mon Compte</span>
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 rounded-md transition-colors duration-150 flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Paramètres</span>
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-gray-800 rounded-md transition-colors duration-150 flex items-center space-x-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
