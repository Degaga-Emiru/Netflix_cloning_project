import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaPlus, FaCheck, FaVolumeUp, FaVolumeMute, FaArrowLeft } from 'react-icons/fa';
import { useList } from '../../hooks/useList';
import { formatDate, convertRuntime } from '../../utils/helpers';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [muted, setMuted] = useState(true);
  const { addToList, removeFromList, isInList } = useList();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const [movieResponse, creditsResponse, similarResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_API_KEY}`)
        ]);

        setMovie({
          ...movieResponse.data,
          cast: creditsResponse.data.cast.slice(0, 10),
          similar: similarResponse.data.results.slice(0, 6)
        });
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToList = () => {
    if (!movie) return;
    
    if (isInList(movie.id)) {
      removeFromList(movie.id);
    } else {
      addToList({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        media_type: 'movie'
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-netflix-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-netflix-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-netflix-black text-white">
        <h2 className="text-2xl mb-4">Error loading movie</h2>
        <p className="text-red-500 mb-6">{error}</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-netflix-red px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-netflix-black text-white">
        <h2 className="text-2xl mb-4">Movie not found</h2>
        <button 
          onClick={() => navigate('/browse')}
          className="bg-netflix-red px-4 py-2 rounded"
        >
          Browse Movies
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-30 bg-black/70 p-2 rounded-full hover:bg-gray-700 transition" >
        <FaArrowLeft className="text-xl" />
      </button>

      {/* Background with overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent z-10" />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Content */}
      <div className="relative z-20 pt-32 px-4 md:px-16 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Movie Title and Actions */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
            <div className="flex flex-wrap gap-4 mb-6">
              <button className="flex items-center bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-opacity-80 transition">
                <FaPlay className="mr-2" /> Play
              </button>
              <button 
                onClick={handleAddToList}
                className={`flex items-center px-6 py-2 rounded-md font-semibold transition ${
                  isInList(movie.id) 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-gray-600 hover:bg-gray-700'
                }`}
              >
                {isInList(movie.id) ? (
                  <FaCheck className="mr-2" />
                ) : (
                  <FaPlus className="mr-2" />
                )}
                My List
              </button>
              <button 
                onClick={() => setMuted(!muted)}
                className="flex items-center bg-gray-600 bg-opacity-70 text-white px-4 py-2 rounded-full font-semibold hover:bg-opacity-50 transition"
              >
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
          </div>

          {/* Movie Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Overview</h2>
                <p className="text-gray-300">{movie.overview}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div>
                  <p className="text-gray-400">Release Date:</p>
                  <p>{formatDate(movie.release_date)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Rating:</p>
                  <p>{movie.vote_average.toFixed(1)}/10 ({movie.vote_count.toLocaleString()} votes)</p>
                </div>
                <div>
                  <p className="text-gray-400">Runtime:</p>
                  <p>{convertRuntime(movie.runtime)}</p>
                </div>
                <div>
                  <p className="text-gray-400">Status:</p>
                  <p>{movie.status}</p>
                </div>
              </div>

              {movie.genres?.length > 0 && (
                <div className="mb-8">
                  <p className="text-gray-400">Genres:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {movie.genres.map(genre => (
                      <span key={genre.id} className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {movie.cast?.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-xl font-bold mb-4">Cast</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {movie.cast.map(person => (
                      <div key={person.id} className="text-center">
                        <img
                          src={person.profile_path 
                            ? `https://image.tmdb.org/t/p/w200${person.profile_path}`
                            : '/placeholder-person.jpg'}
                          alt={person.name}
                          className="w-full h-auto rounded-lg mb-2"
                        />
                        <p className="font-semibold">{person.name}</p>
                        <p className="text-sm text-gray-400">{person.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar with additional info */}
            <div className="space-y-6">
              {movie.tagline && (
                <div className="italic text-gray-400">"{movie.tagline}"</div>
              )}

              {movie.production_companies?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Production Companies</h3>
                  <div className="flex flex-wrap gap-4">
                    {movie.production_companies.map(company => (
                      <div key={company.id} className="flex items-center">
                        {company.logo_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                            alt={company.name}
                            className="h-8 object-contain"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {movie.similar?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Similar Movies</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {movie.similar.map(similarMovie => (
                      <img
                        key={similarMovie.id}
                        src={`https://image.tmdb.org/t/p/w200${similarMovie.poster_path}`}
                        alt={similarMovie.title}
                        className="w-full rounded cursor-pointer hover:opacity-80 transition"
                        onClick={() => navigate(`/movie/${similarMovie.id}`)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;