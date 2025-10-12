import { useState, useEffect } from 'react';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import { getTodos, addTodo, updateTodo, deleteTodo } from '../services/todosApi';

function Todos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, active, completed

  // Charger les todos au montage
  useEffect(() => {
    async function loadTodos() {
      setLoading(true);
      const data = await getTodos();
      setTodos(data);
      setLoading(false);
    }

    loadTodos();
  }, []);

  // Ajouter un todo
  const handleAdd = async (title) => {
    const newTodo = await addTodo(title);

    if (newTodo) {
      // Ajouter au début de la liste
      setTodos([newTodo, ...todos]);
    }
  };

  // Basculer le statut d'un todo
  const handleToggle = async (id) => {
    // Trouver le todo
    const todo = todos.find(t => t.id === id);

    // Mettre à jour via l'API
    await updateTodo(id, !todo.completed);

    // Mettre à jour le state local
    setTodos(todos.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  // Supprimer un todo
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      const success = await deleteTodo(id);

      if (success) {
        setTodos(todos.filter(t => t.id !== id));
      }
    }
  };

  // Filtrer les todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; // 'all'
  });

  // Statistiques
  const totalTodos = todos.length;
  const completedTodos = todos.filter(t => t.completed).length;
  const activeTodos = totalTodos - completedTodos;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6">✅ Mes Tâches</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <h5 className="text-2xl font-bold">{totalTodos}</h5>
          <p className="text-gray-400">Total</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <h5 className="text-2xl font-bold text-yellow-400">{activeTodos}</h5>
          <p className="text-gray-400">En cours</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md text-center">
          <h5 className="text-2xl font-bold text-green-400">{completedTodos}</h5>
          <p className="text-gray-400">Terminées</p>
        </div>
      </div>

      <TodoForm onAdd={handleAdd} />

      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setFilter('all')}
        >
          Toutes ({totalTodos})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setFilter('active')}
        >
          En cours ({activeTodos})
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'}`}
          onClick={() => setFilter('completed')}
        >
          Terminées ({completedTodos})
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center text-gray-400">Aucune tâche à afficher. {filter !== 'all' && 'Essayez un autre filtre.'}</div>
      ) : (
        <ul className="space-y-4">
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Todos;
