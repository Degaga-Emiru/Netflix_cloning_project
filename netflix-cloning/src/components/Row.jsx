import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results || []);
      } catch (err) {
        console.error("Row fetch error:", err);
        setError(err.message);
        setMovies([]);
      }
    };
    fetchData();
  }, [fetchUrl]);

  if (error) return <div className="text-red-500 p-4">Error loading {title}</div>;

  return (
    <div className="ml-5 text-white">
      <h2 className="text-xl font-bold md:text-2xl lg:text-3xl mb-4">{title}</h2>
      <div className="relative">
        <div className="flex space-x-4 overflow-y-hidden overflow-x-scroll scrollbar-hide p-4">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              isLargeRow={isLargeRow}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Row;