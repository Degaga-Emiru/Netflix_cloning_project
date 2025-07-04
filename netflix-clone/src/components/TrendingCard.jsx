// src/components/TrendingCard.jsx
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TrendingCard = ({ item, isLarge = false }) => {
  const navigate = useNavigate();
  const baseUrl = 'https://image.tmdb.org/t/p/original/';

  const handleClick = () => {
    navigate(`/${item.media_type || 'movie'}/${item.id}`);
  };

  return (
    <motion.div
      className={`relative min-w-[180px] cursor-pointer transition duration-200 ease-out ${
        isLarge ? 'h-64 md:h-80' : 'h-40 md:h-48'
      }`}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src={`${baseUrl}${isLarge ? item.poster_path : item.backdrop_path}`}
        alt={item.title || item.name}
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent rounded-b-lg">
        <h3 className="text-white font-semibold text-sm truncate">
          {item.title || item.name}
        </h3>
        <div className="flex items-center text-xs text-gray-300">
          <span className="text-green-500 font-semibold mr-2">
            {Math.round(item.vote_average * 10)}%
          </span>
          <span>
            {item.release_date?.substring(0, 4) ||
              item.first_air_date?.substring(0, 4)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingCard;