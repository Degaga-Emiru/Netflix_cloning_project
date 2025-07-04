import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPlayer from 'react-player';
import requests from '../services/requests';
import { PlayIcon, PlusIcon, CheckIcon, ArrowLeftIcon } from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import CastCarousel from '../components/CastCarousel';
import SimilarMovies from '../components/SimilarMovies';

const MovieInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isInMyList, setIsInMyList] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await axios.get(requests.fetchMovieDetails(id));
        setMovie(movieResponse.data);

        // Check if movie is in user's list
        if (user) {
          const userRef = doc(db, 'users', user.uid);
          // eslint-disable-next-line no-undef
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userList = userDoc.data().myList || [];
            setIsInMyList(userList.some(item => item.id === movieResponse.data.id));
          }
        }

        // Fetch videos
        const videosResponse = await axios.get(requests.fetchMovieVideos(id));
        const trailer = videosResponse.data.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) setTrailerKey(trailer.key);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        navigate('/browse');
      }
    };

    fetchMovieData();
  }, [id, user, navigate]);

  const handleAddToList = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      if (isInMyList) {
        await updateDoc(userRef, {
          myList: arrayRemove(movie)
        });
      } else {
        await updateDoc(userRef, {
          myList: arrayUnion(movie)
        });
      }
      setIsInMyList(!isInMyList);
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const handlePlay = () => {
    navigate(`/watch/${id}`, { state: { mediaType: movie.media_type || 'movie' } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-netflixBlack flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-netflixBlack text-white min-h-screen">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-50 bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
      >
        <ArrowLeftIcon className="h-6 w-6 text-white" />
      </button>

      {/* Trailer/Backdrop */}
      <div className="relative pt-[56.25%] bg-black">
        {trailerKey ? (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailerKey}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0 }}
            controls
            playing
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title || movie.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        )}
      </div>

      {/* Movie Info */}
      <div className="relative z-10 px-4 md:px-12 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            {movie.title || movie.name}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-300">
            <span className="text-green-500 font-semibold">
              {Math.round(movie.vote_average * 10)}% Match
            </span>
            <span>{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
            {movie.runtime && <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>}
            <span className="border border-gray-400 px-1 text-xs">
              {movie.adult ? '18+' : 'PG'}
            </span>
          </div>

          <div className="flex gap-4 mb-8">
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              <PlayIcon className="h-6 w-6" />
              <span className="font-bold">Play</span>
            </button>
            <button
              onClick={handleAddToList}
              className="flex items-center gap-2 bg-gray-600/70 text-white px-4 py-2 rounded hover:bg-gray-500/70 transition-colors"
            >
              {isInMyList ? (
                <CheckIcon className="h-6 w-6 text-green-500" />
              ) : (
                <PlusIcon className="h-6 w-6" />
              )}
              <span>My List</span>
            </button>
          </div>

          <p className="text-lg mb-8">{movie.overview}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              {/* Cast */}
              <CastCarousel movieId={id} />

              {/* Similar Movies */}
              <SimilarMovies movieId={id} mediaType={movie.media_type || 'movie'} />
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-gray-400 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map(genre => (
                    <span key={genre.id} className="text-sm">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {movie.created_by?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Creators</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.created_by.map(person => (
                      <span key={person.id} className="text-sm">
                        {person.name}
                      </span>
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

export default MovieInfo;