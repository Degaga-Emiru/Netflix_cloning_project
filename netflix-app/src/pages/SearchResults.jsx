import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import requests from '../services/requests';
import MovieCard from '../components/MovieCard';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${requests.fetchSearch}${query}`);
        setResults(response.data.results);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchResults();
    }
  }, [query]);

  if (loading) {
    return <div className="pt-32 text-center">Loading...</div>;
  }

  return (
    <div className="pt-32 pb-12 px-4 md:px-12">
      <h2 className="text-2xl font-bold mb-8">Search Results for "{query}"</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="text-center text-gray-400">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;