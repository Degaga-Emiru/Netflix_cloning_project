// src/pages/SearchResults.jsx
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Header from '../components/Header';
import Thumbnail from '../components/Thumbnail';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');
  const [searchQuery, setSearchQuery] = useState(query || '');

  const { data, loading, error } = useFetch(
    query ? `/search/multi?query=${query}` : null
  );

  useEffect(() => {
    if (!query) {
      navigate('/');
    } else {
      setSearchQuery(query);
    }
  }, [query, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="pt-32 px-4 md:px-12">
          <h1 className="text-2xl font-bold text-white mb-6">
            Searching for "{searchQuery}"...
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-800 rounded h-40 md:h-60 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900">
        <Header />
        <div className="pt-32 px-4 md:px-12 text-white">
          <h1 className="text-2xl font-bold mb-4">Error loading results</h1>
          <p>{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="pt-32 px-4 md:px-12 pb-16">
        <h1 className="text-2xl font-bold text-white mb-6">
          Search Results for "{searchQuery}"
        </h1>
        {data?.results?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.results.map(
              (item) =>
                (item.media_type === 'movie' || item.media_type === 'tv') && (
                  <Thumbnail key={item.id} item={item} />
                )
            )}
          </div>
        ) : (
          <div className="text-white text-center py-16">
            <p className="text-xl">No results found for "{searchQuery}"</p>
            <p className="text-gray-400 mt-2">
              Try different keywords or check the spelling
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;