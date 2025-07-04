import { useAuthStore } from '../store/authStore';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  const { myList } = useAuthStore();

  return (
    <div className="pt-20 px-4 md:px-16 min-h-screen bg-[#141414] text-white">
      <h1 className="text-2xl md:text-4xl font-bold mb-8">My List</h1>
      {myList.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-xl md:text-2xl mb-4">Your list is empty</h2>
          <p className="text-gray-400">
            Add movies and TV shows to your list to watch them later
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {myList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} isLargeRow={true} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyList;