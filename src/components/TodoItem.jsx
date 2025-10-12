function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-2">
      <div className="flex items-center">
        <input
          className="h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 transition-all"
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}`}
        />
        <label
          className={`ml-3 text-lg font-medium cursor-pointer transition-colors ${todo.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-gray-100'}`}
          htmlFor={`todo-${todo.id}`}
        >
          {todo.title}
        </label>
      </div>

      <button
        className="ml-4 px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-150 shadow-sm text-base"
        onClick={() => onDelete(todo.id)}
        aria-label="Delete todo"
      >
        🗑️
      </button>
    </li>
  );
}

export default TodoItem;
