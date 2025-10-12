import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Films from './pages/Films';
import Series from './pages/Series';
import MyList from './pages/MyList';
import Quiz from './pages/Quiz';
import MovieDetails from './pages/MovieDetails';
import Todos from './pages/Todos';
import Contact from './pages/Contact';
import { MyListProvider } from './context/MyListContext';

function App() {
  return (
    <BrowserRouter>
      <MyListProvider>
        <Navbar />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/films" element={<Films />} />
            <Route path="/series" element={<Series />} />
            <Route path="/ma-liste" element={<MyList />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={
              <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold mb-4">Page non trouvée</h2>
                  <p className="text-gray-400">La page que vous recherchez n'existe pas.</p>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </MyListProvider>
    </BrowserRouter>
  );
}

export default App;
