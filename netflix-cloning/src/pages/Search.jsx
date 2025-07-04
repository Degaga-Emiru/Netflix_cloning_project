import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchMulti } from '../utils/api';
import MovieCard from '../components/MovieCard';

const Search = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (query) {
        const request = await searchMulti(query);
        setResults(request.data.results);
      }
    };
    fetchSearchResults();
  }, [query]);

  return (
    <div className="pt-20 px-4 md:px-16 min-h-screen bg-[#141414] text-white">
      <h1 className="text-2xl md:text-4xl font-bold mb-8">
        Search Results for "{query}"
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {results.map((item) => (
          <MovieCard 
            key={item.id} 
            movie={item} 
            isLargeRow={true} 
          />
        ))}
      </div>
    </div>
  );
};

export default Search;