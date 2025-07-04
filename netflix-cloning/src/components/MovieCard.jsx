import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const MovieCard = ({ movie, isLargeRow }) => {
  const navigate = useNavigate();
  const { addToList } = useAuthStore();

  const base_url = 'https://image.tmdb.org/t/p/original/';

  return (
    <div 
      className={`relative transition duration-200 ease-in transform hover:scale-105 ${isLargeRow ? 'h-64 min-w-[180px]' : 'h-48 min-w-[240px]'}`}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <img
        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
        alt={movie.title}
        className="rounded object-cover h-full w-full"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 p-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <h3 className="text-white font-bold">{movie.title || movie.name}</h3>
        <button 
          className="mt-2 text-xs bg-netflixRed text-white px-2 py-1 rounded"
          onClick={(e) => {
            e.stopPropagation();
            addToList(movie);
          }}
        >
          Add to List
        </button>
      </div>
    </div>
  );
};

export default MovieCard;