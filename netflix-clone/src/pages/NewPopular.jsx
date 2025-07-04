import Nav from '../components/Nav';
import Row from '../components/Row';
import { useMovieData } from '../hooks/useMovieData';

const NewPopular = () => {
  const { movies, loading } = useMovieData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-netflix-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-netflix-red"></div>
      </div>
    );
  }

  // Combine trending and new releases
  const newReleases = [...movies.trendingNow]
    .sort((a, b) => new Date(b.release_date || b.first_air_date) - new Date(a.release_date || a.first_air_date))
    .slice(0, 20);

  return (
    <div className="relative bg-netflix-black min-h-screen">
      <Nav />
      <div className="pt-16">
        <Row title="New Releases" movies={newReleases} />
        <Row title="Trending Now" movies={movies.trendingNow} />
        <Row title="Popular on Netflix" movies={movies.netflixOriginals} />
      </div>
    </div>
  );
};

export default NewPopular;