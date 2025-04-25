// eslint-disable-next-line no-unused-vars
import { useEffect } from 'react';
import Nav from '../components/Nav';
import Banner from '../components/Banner';
import Row from '../components/Row';
import { useMovieData } from '../hooks/useMovieData';
import { useList } from '../hooks/useList';

export default function Browse() {
  const { movies, loading } = useMovieData();
  const { list } = useList();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-netflix-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-netflix-red"></div>
      </div>
    );
  }

  return (
    <div className="relative bg-netflix-black">
      <Nav />
      <Banner netflixOriginals={movies.netflixOriginals} />
      
      <section className="pb-20 -mt-32 relative z-10">
        {list.length > 0 && (
          <Row title="My List" movies={list} />
        )}
        <Row title="Netflix Originals" movies={movies.netflixOriginals} />
        <Row title="Trending Now" movies={movies.trendingNow} />
        <Row title="Top Rated" movies={movies.topRated} />
        <Row title="Action Movies" movies={movies.actionMovies} />
        <Row title="Comedy Movies" movies={movies.comedyMovies} />
        <Row title="Horror Movies" movies={movies.horrorMovies} />
        <Row title="Romance Movies" movies={movies.romanceMovies} />
        <Row title="Documentaries" movies={movies.documentaries} />
      </section>
    </div>
  );
}