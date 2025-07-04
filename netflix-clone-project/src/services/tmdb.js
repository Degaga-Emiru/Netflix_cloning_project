import axios from 'axios';

const API_KEY = 'ff1bd559990b4ad401f6dd1b82675051'; // Replace with your actual TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrending = async () => {
  try {
    const { data } = await tmdb.get('/trending/all/week');
    return data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
};

export const fetchNetflixOriginals = async () => {
  try {
    const { data } = await tmdb.get('/discover/tv', {
      params: {
        with_networks: 213,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching Netflix originals:', error);
    return [];
  }
};

export const fetchTopRated = async () => {
  try {
    const { data } = await tmdb.get('/movie/top_rated');
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated:', error);
    return [];
  }
};

export const fetchActionMovies = async () => {
  try {
    const { data } = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 28,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching action movies:', error);
    return [];
  }
};

export const fetchComedyMovies = async () => {
  try {
    const { data } = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 35,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching comedy movies:', error);
    return [];
  }
};

export const fetchHorrorMovies = async () => {
  try {
    const { data } = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 27,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching horror movies:', error);
    return [];
  }
};

export const fetchRomanceMovies = async () => {
  try {
    const { data } = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 10749,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching romance movies:', error);
    return [];
  }
};

export const fetchDocumentaries = async () => {
  try {
    const { data } = await tmdb.get('/discover/movie', {
      params: {
        with_genres: 99,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error fetching documentaries:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await tmdb.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos',
      },
    });
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await tmdb.get('/search/multi', {
      params: {
        query,
      },
    });
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getImageUrl = (path, size = 'w500') => {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null;
};