const API_KEY = import.meta.env.VITE_TMDB_API_KEY; // For Vite
const BASE_URL = 'https://api.themoviedb.org/3';

const requests = {
  fetchTrending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchPopular: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`,
  fetchTVShows: `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US`,
  fetchUpcoming: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US`,
  fetchMovieDetails: (id) => `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`,
  fetchMovieVideos: (id) => `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
  fetchSearch: (query) => `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${query}`,
  fetchMovieCredits: (id) => `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`,
  fetchSimilarMovies: (id) => `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`,
  fetchSimilarTV: (id) => `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`,
   fetchTVDetails: (id) => `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=credits,videos`,
};

export default requests;