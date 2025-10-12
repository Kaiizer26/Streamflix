import { useMyList } from '../context/MyListContext';
import MovieList from '../components/MovieList';

function MyList() {
  const { myList } = useMyList();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Ma Liste</h1>
        {myList.length === 0 ? (
          <div className="text-center py-16">
            <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
            </svg>
            <p className="text-gray-400 text-xl">Votre liste est vide</p>
            <p className="text-gray-500 mt-2">Ajoutez des films à votre liste pour les retrouver facilement ici.</p>
          </div>
        ) : (
          <>
            <MovieList movies={myList} />
          </>
        )}
      </div>
    </div>
  );
}

export default MyList;
