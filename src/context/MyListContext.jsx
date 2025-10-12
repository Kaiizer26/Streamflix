import { createContext, useContext, useState, useEffect } from 'react';

const MyListContext = createContext();

export function MyListProvider({ children }) {
  const [myList, setMyList] = useState(() => {
    // Charger la liste depuis le localStorage au démarrage
    const savedList = localStorage.getItem('myList');
    return savedList ? JSON.parse(savedList) : [];
  });

  // Sauvegarder dans le localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('myList', JSON.stringify(myList));
  }, [myList]);

  const addToMyList = (movie) => {
    setMyList((prevList) => {
      // Vérifier si le film n'est pas déjà dans la liste
      if (prevList.find(m => m.id === movie.id)) {
        return prevList;
      }
      return [...prevList, movie];
    });
  };

  const removeFromMyList = (movieId) => {
    setMyList((prevList) => prevList.filter(m => m.id !== movieId));
  };

  const isInMyList = (movieId) => {
    return myList.some(m => m.id === movieId);
  };

  return (
    <MyListContext.Provider value={{ myList, addToMyList, removeFromMyList, isInMyList }}>
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  const context = useContext(MyListContext);
  if (!context) {
    throw new Error('useMyList doit être utilisé à l\'intérieur d\'un MyListProvider');
  }
  return context;
}
