import { useState } from 'react';
import { useList } from '../hooks/useList';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Thumbnail = ({ movie }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const { addToList, removeFromList, isInList } = useList();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleListClick = (e) => {
    e.stopPropagation();
    if (isInList(movie.id)) {
      removeFromList(movie.id);
    } else {
      addToList(movie);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`relative min-w-[180px] h-28 md:min-w-[260px] md:h-40 cursor-pointer transition duration-200 ease-out ${
        isHovered ? 'transform scale-110 z-50' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${
          isHovered ? movie?.backdrop_path : movie?.poster_path
        }`}
        alt={movie?.title || movie?.name}
        className="w-full h-full rounded-sm object-cover"
      />
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-bold">{movie?.title || movie?.name}</h3>
              <p className="text-xs line-clamp-2">{movie?.overview}</p>
            </div>
            <button
              onClick={handleListClick}
              className="p-2 bg-black/70 rounded-full"
            >
              {isInList(movie.id) ? (
                <FaCheck className="text-green-500" />
              ) : (
                <FaPlus className="text-white" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Thumbnail;