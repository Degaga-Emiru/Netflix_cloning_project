// src/components/SearchBar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  const clearSearch = () => {
    setQuery('');
  };

  return (
    <form
      onSubmit={handleSearch}
      className={`relative flex items-center transition-all duration-300 ${
        isFocused ? 'w-64 md:w-80' : 'w-40 md:w-60'
      }`}
    >
      <input
        type="text"
        placeholder="Titles, people, genres"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-black bg-opacity-70 border border-gray-600 rounded px-4 py-2 text-white focus:outline-none focus:border-white"
      />
      {query ? (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute right-10 text-gray-400 hover:text-white"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      ) : (
        <MagnifyingGlassIcon className="absolute right-3 h-5 w-5 text-gray-400" />
      )}
      <button
        type="submit"
        className="ml-2 px-3 py-2 bg-netflix-red rounded text-white font-semibold text-sm"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;