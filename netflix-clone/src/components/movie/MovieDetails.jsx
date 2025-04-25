import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaPlus, FaCheck, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}&append_to_response=videos`
        );
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <div className="text-white text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!movie) return <div className="text-white text-center py-8">Movie not found</div>;

  return (
    <div className="relative h-screen text-white">
      {/* Background with overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-20 pt-32 px-8 md:px-16 h-full">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
        
        <div className="flex gap-4 mb-8">
          <button className="flex items-center bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-opacity-80">
            <FaPlay className="mr-2" /> Play
          </button>
          <button className="flex items-center bg-gray-600 bg-opacity-70 text-white px-6 py-2 rounded-md font-semibold">
            {movie.inList ? (
              <FaCheck className="mr-2 text-green-500" />
            ) : (
              <FaPlus className="mr-2" />
            )} My List
          </button>
          <button 
            onClick={() => setMuted(!muted)}
            className="flex items-center bg-gray-600 bg-opacity-70 text-white px-4 py-2 rounded-full font-semibold"
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>

        <div className="max-w-2xl">
          <p className="text-lg mb-4">{movie.overview}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-400">Release Date:</p>
              <p>{movie.release_date}</p>
            </div>
            <div>
              <p className="text-gray-400">Rating:</p>
              <p>{movie.vote_average}/10 ({movie.vote_count} votes)</p>
            </div>
            <div>
              <p className="text-gray-400">Genres:</p>
              <p>{movie.genres?.map(g => g.name).join(', ')}</p>
            </div>
            <div>
              <p className="text-gray-400">Runtime:</p>
              <p>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;