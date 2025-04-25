import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'ff1bd559990b4ad401f6dd1b82675051'; // Get from https://www.themoviedb.org/

export const useMovieData = () => {
  const [movies, setMovies] = useState({
    netflixOriginals: [],
    trendingNow: [],
    topRated: [],
    actionMovies: [],
    comedyMovies: [],
    horrorMovies: [],
    romanceMovies: [],
    documentaries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const requests = [
          axios.get(`https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_networks=213`),
          axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US`),
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=28`),
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=35`),
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`),
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=10749`),
          axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=99`),
        ];

        const [
          netflixOriginals,
          trendingNow,
          topRated,
          actionMovies,
          comedyMovies,
          horrorMovies,
          romanceMovies,
          documentaries,
        ] = await Promise.all(requests);

        setMovies({
          netflixOriginals: netflixOriginals.data.results,
          trendingNow: trendingNow.data.results,
          topRated: topRated.data.results,
          actionMovies: actionMovies.data.results,
          comedyMovies: comedyMovies.data.results,
          horrorMovies: horrorMovies.data.results,
          romanceMovies: romanceMovies.data.results,
          documentaries: documentaries.data.results,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie data:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, loading };
};