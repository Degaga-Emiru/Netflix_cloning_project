import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayIcon, PlusIcon, CheckIcon, XIcon } from './UI/Icons';
import { useAuth } from '../context/AuthContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';

const MovieCard = ({ movie, showRemoveButton = false, isInList = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isInMyList, setIsInMyList] = useState(isInList);

  const handleAddToList = async (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        myList: arrayUnion(movie)
      });
      setIsInMyList(true);
    } catch (error) {
      console.error('Error adding to list:', error);
    }
  };

  const handleRemoveFromList = async (e) => {
    e.stopPropagation();
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        myList: arrayRemove(movie)
      });
      setIsInMyList(false);
    } catch (error) {
      console.error('Error removing from list:', error);
    }
  };

  const handlePlay = () => {
    navigate(`/watch/${movie.id}`, { state: { mediaType: movie.media_type || 'movie' } });
  };

  return (
    <div 
      className="relative aspect-[2/3] rounded overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePlay}
    >
      {/* Movie Poster */}
      <img
        src={
          movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : '/placeholder-movie.jpg' // Fallback image
        }
        alt={movie.title || movie.name}
        className="w-full h-full object-cover"
        loading="lazy"
      />

      {/* Hover Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        {/* Bottom Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
        
        {/* Action Buttons */}
        <div className="absolute bottom-4 left-0 right-0 px-2 flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
              onClick={handlePlay}
            >
              <PlayIcon className="h-4 w-4" />
            </button>
          </div>
          
          {showRemoveButton ? (
            <button 
              className="bg-gray-800/80 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
              onClick={handleRemoveFromList}
            >
              <XIcon className="h-4 w-4" />
            </button>
          ) : (
            <button 
              className="bg-gray-800/80 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
              onClick={isInMyList ? handleRemoveFromList : handleAddToList}
            >
              {isInMyList ? (
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <PlusIcon className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Title and Info */}
        <div className="absolute bottom-16 left-0 right-0 px-4">
          <h3 className="text-white font-bold text-sm truncate">
            {movie.title || movie.name}
          </h3>
          <div className="flex items-center text-gray-300 text-xs mt-1">
            <span>{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
            <span className="mx-1">•</span>
            <span>{movie.vote_average?.toFixed(1)} ★</span>
          </div>
        </div>
      </div>

      {/* Loading State (optional) */}
      {!movie.poster_path && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <span className="text-gray-500 text-sm">No image available</span>
        </div>
      )}
    </div>
  );
};

export default MovieCard;