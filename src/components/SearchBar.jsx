function SearchBar({ value, onChange }) {
  return (
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
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}

export default SearchBar;
