import { useEffect, useState } from 'react';
import { fetchNetflixOriginals } from '../utils/api';
import { PlayIcon, InformationCircleIcon } from '@heroicons/react/24/solid';

const Banner = () => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const request = await fetchNetflixOriginals();
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    };
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  if (!movie) return null;

  return (
    <div className="relative h-[95vh] w-full text-white">
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-black via-transparent to-transparent" />
      <img
        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
        alt={movie?.title || movie?.name || movie?.original_name}
        className="h-full w-full object-cover"
      />
      <div className="absolute bottom-1/4 left-4 md:left-10 w-full md:w-2/3 lg:w-1/2">
        <h1 className="text-3xl font-bold md:text-5xl lg:text-6xl mb-4">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <p className="text-sm md:text-lg mb-4">
          {truncate(movie?.overview, 150)}
        </p>
        <div className="flex space-x-4">
          <button className="flex items-center justify-center rounded bg-white px-6 py-2 text-black hover:bg-opacity-80">
            <PlayIcon className="h-6 w-6 mr-1" />
            Play
          </button>
          <button className="flex items-center justify-center rounded bg-gray-600 bg-opacity-70 px-6 py-2 hover:bg-opacity-50">
            <InformationCircleIcon className="h-6 w-6 mr-1" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;