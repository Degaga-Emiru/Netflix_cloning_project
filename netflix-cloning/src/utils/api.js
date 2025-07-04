import axios from 'axios';

const API_KEY = 'ff1bd559990b4ad401f6dd1b82675051';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// Consolidated API functions (all return axios promises)
export const fetchTrending = () => api.get('/trending/all/week');
export const fetchNetflixOriginals = () => api.get('/discover/tv', { params: { with_networks: 213 } });
export const fetchTopRated = () => api.get('/movie/top_rated');
export const fetchActionMovies = () => api.get('/discover/movie', { params: { with_genres: 28 } });
export const fetchComedyMovies = () => api.get('/discover/movie', { params: { with_genres: 35 } });
export const fetchHorrorMovies = () => api.get('/discover/movie', { params: { with_genres: 27 } });
export const fetchRomanceMovies = () => api.get('/discover/movie', { params: { with_genres: 10749 } });
export const fetchDocumentaries = () => api.get('/discover/movie', { params: { with_genres: 99 } });
export const fetchMovieDetails = (id) => api.get(`/movie/${id}`);
export const fetchTVDetails = (id) => api.get(`/tv/${id}`);
export const searchMulti = (query) => api.get('/search/multi', { params: { query } });

// Updated TV-related endpoints to use axios consistently
export const fetchTrendingTV = () => api.get('/trending/tv/week');
export const fetchTopRatedTV = () => api.get('/tv/top_rated');
export const fetchPopularTV = () => api.get('/tv/popular');
export const fetchTVGenres = (genreId) => api.get('/discover/tv', { params: { with_genres: genreId } });

export default api;