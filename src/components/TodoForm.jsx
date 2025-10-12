import { useState } from 'react';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    // Validation
    if (title.trim() === '') {
      alert('Veuillez entrer une tâche');
      return;
    }

    setIsSubmitting(true);
    await onAdd(title);
    setTitle(''); // Réinitialiser le champ
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-900 bg-white"
          placeholder="Ajouter une nouvelle tâche..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting}
        />
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? '...' : '+ Ajouter'}
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
