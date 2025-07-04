import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieDetails, fetchTVDetails } from '../utils/api';
import { PlayIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useAuthStore } from '../store/authStore';

const MovieDetails = ({ isTV = false }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const { addToList } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      const request = isTV 
        ? await fetchTVDetails(id) 
        : await fetchMovieDetails(id);
      setMovie(request.data);
    };
    fetchData();
  }, [id, isTV]);

  if (!movie) return null;

  return (
    <div className="relative min-h-screen text-white">
      <div className="relative h-[56.25vw]">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt={movie.title || movie.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      <div className="absolute top-1/4 left-4 md:left-16 max-w-2xl">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {movie.title || movie.name}
        </h1>
        <p className="text-sm md:text-lg mb-4">{movie.overview}</p>
        <div className="flex space-x-4 mb-8">
          <button className="flex items-center justify-center rounded bg-white px-6 py-2 text-black hover:bg-opacity-80">
            <PlayIcon className="h-6 w-6 mr-1" />
            Play
          </button>
          <button 
            className="flex items-center justify-center rounded bg-gray-600 bg-opacity-70 px-6 py-2 hover:bg-opacity-50"
            onClick={() => addToList(movie)}
          >
            <PlusIcon className="h-6 w-6 mr-1" />
            My List
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Release Date:</p>
            <p>{movie.release_date || movie.first_air_date}</p>
          </div>
          <div>
            <p className="text-gray-400">Rating:</p>
            <p>{movie.vote_average}/10</p>
          </div>
          <div>
            <p className="text-gray-400">Runtime:</p>
            <p>{movie.runtime || movie.episode_run_time?.[0]} min</p>
          </div>
          <div>
            <p className="text-gray-400">Genres:</p>
            <p>{movie.genres?.map(g => g.name).join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;