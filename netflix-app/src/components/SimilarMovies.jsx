import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../services/requests';
import MovieCard from './MovieCard';

const SimilarMovies = ({ movieId, mediaType }) => {
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      const endpoint = mediaType === 'tv' 
        ? requests.fetchSimilarTV(movieId) 
        : requests.fetchSimilarMovies(movieId);
      const response = await axios.get(endpoint);
      setSimilar(response.data.results.slice(0, 6));
    };
    fetchSimilar();
  }, [movieId, mediaType]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">More Like This</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {similar.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;