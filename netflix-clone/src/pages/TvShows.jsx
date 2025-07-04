import Nav from '../components/Nav';
import Row from '../components/Row';
import { useMovieData } from '../hooks/useMovieData';
import {  getYearFromDate, getMediaTypeIcon } from '../utils/helpers';

const TvShows = () => {
  const { movies, loading } = useMovieData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-netflix-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-netflix-red"></div>
      </div>
    );
  }

  // Filter TV shows from each category
  const popularTvShows = movies.trendingNow.filter(movie => movie.media_type === 'tv');
  const netflixOriginalsTv = movies.netflixOriginals.filter(movie => movie.media_type === 'tv');
  const topRatedTvShows = movies.topRated.filter(movie => movie.media_type === 'tv');

  return (
    <div className="relative bg-netflix-black min-h-screen">
      <Nav />
      <div className="pt-16 px-4 md:px-8">
        {/* Popular TV Shows */}
        {popularTvShows.length > 0 && (
          <Row 
            title={
              <div className="flex items-center">
                <span className="mr-2">{getMediaTypeIcon('tv')}</span>
                <span>Popular TV Shows</span>
              </div>
            }
            movies={popularTvShows.map(show => ({
              ...show,
              subtitle: getYearFromDate(show.first_air_date || show.release_date)
            }))} 
          />
        )}

        {/* Netflix Originals */}
        {netflixOriginalsTv.length > 0 && (
          <Row 
            title={
              <div className="flex items-center">
                <span className="mr-2">{getMediaTypeIcon('tv')}</span>
                <span>Netflix Originals TV Shows</span>
              </div>
            }
            movies={netflixOriginalsTv.map(show => ({
              ...show,
              subtitle: getYearFromDate(show.first_air_date || show.release_date)
            }))} 
          />
        )}

        {/* Top Rated TV Shows */}
        {topRatedTvShows.length > 0 && (
          <Row 
            title={
              <div className="flex items-center">
                <span className="mr-2">{getMediaTypeIcon('tv')}</span>
                <span>Top Rated TV Shows</span>
              </div>
            }
            movies={topRatedTvShows.map(show => ({
              ...show,
              subtitle: getYearFromDate(show.first_air_date || show.release_date)
            }))} 
          />
        )}
      </div>
    </div>
  );
};

export default TvShows;