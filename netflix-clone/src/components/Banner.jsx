import { useState, useEffect } from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Banner = ({ netflixOriginals }) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (netflixOriginals?.length > 0) {
      setMovie(
        netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
      );
    }
  }, [netflixOriginals]);

  if (!movie) return null;

  return (
    <div className="relative h-[80vh] md:h-[90vh]">
      <div className="absolute inset-0 bg-gradient-to-r from-netflixBlack to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflixBlack to-transparent z-10" />
      
      <img
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.name || movie?.title}
        className="w-full h-full object-cover"
      />
      
      <div className="absolute bottom-1/4 left-4 md:left-16 z-20 max-w-md">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          {movie?.name || movie?.title}
        </h1>
        <p className="text-sm md:text-base mb-4 line-clamp-3">
          {movie?.overview}
        </p>
        <div className="flex space-x-4">
          <button className="flex items-center justify-center bg-white text-black px-6 py-2 rounded-md font-semibold hover:bg-opacity-80 transition">
            <FaPlay className="mr-2" /> Play
          </button>
          <button className="flex items-center justify-center bg-gray-600 bg-opacity-70 text-white px-6 py-2 rounded-md font-semibold hover:bg-opacity-50 transition">
            <FaInfoCircle className="mr-2" /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;