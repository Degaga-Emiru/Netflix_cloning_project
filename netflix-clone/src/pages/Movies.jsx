import Nav from '../components/Nav';
import Row from '../components/Row';
import { useMovieData } from '../hooks/useMovieData';

const Movies = () => {
  const { movies, loading } = useMovieData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-netflix-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-netflix-red"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-netflix-black min-h-screen">
      <Nav />
      <div className="pt-16">
        <Row 
          title="Popular Movies" 
          movies={movies.trendingNow.filter(movie => movie.media_type === 'movie')} 
        />
        <Row 
          title="Top Rated Movies" 
          movies={movies.topRated.filter(movie => movie.media_type === 'movie')} 
        />
        <Row title="Action Movies" movies={movies.actionMovies} />
        <Row title="Comedy Movies" movies={movies.comedyMovies} />
      </div>
    </div>
  );
};

export default Movies;