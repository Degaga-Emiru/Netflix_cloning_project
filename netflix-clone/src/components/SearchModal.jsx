import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch, FaTimes } from 'react-icons/fa';

export default function SearchModal({ onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchMovies = async () => {
      if (query.trim() === '') {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${query}`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="fixed inset-0 bg-black/90 z-50 p-4 overflow-y-auto">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="relative flex-grow max-w-2xl">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for movies, TV shows..."
              className="w-full p-4 pl-12 bg-gray-800 text-white rounded-md focus:outline-none"
              autoFocus
            />
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 text-gray-400 hover:text-white"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-netflix-red"></div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((item) => (
            <div key={item.id} className="group relative">
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path || item.backdrop_path}`}
                alt={item.title || item.name}
                className="w-full h-auto rounded-md group-hover:opacity-70 transition"
              />
              <div className="absolute inset-0 flex items-end p-2 opacity-0 group-hover:opacity-100 transition bg-gradient-to-t from-black via-transparent to-transparent">
                <p className="text-white text-sm font-semibold">
                  {item.title || item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}