import { useState } from 'react';

function TodoEditForm({ todo, onSave, onCancel }) {
  const [title, setTitle] = useState(todo.title);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (title.trim() === '') {
      newErrors.title = 'Le titre ne peut pas être vide';
    } else if (title.length < 3) {
      newErrors.title = 'Le titre doit contenir au moins 3 caractères';
    } else if (title.length > 100) {
      newErrors.title = 'Le titre ne peut pas dépasser 100 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      onSave({ ...todo, title });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded mb-3">
      <div className="mb-3">
        <label htmlFor="edit-title" className="form-label">
          Modifier la tâche
        </label>
        <input
          type="text"
          className={`form-control ${errors.title ? 'is-invalid' : ''}`}
          id="edit-title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            // Effacer l'erreur quand on tape
            if (errors.title) {
              setErrors({});
            }
          }}
        />
        {errors.title && (
          <div className="invalid-feedback d-block">
            {errors.title}
          </div>
        )}
        <div className="form-text">
          {title.length}/100 caractères
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">
          💾 Sauvegarder
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Annuler
        </button>
      </div>
    </form>
  );
}

export default TodoEditForm;
