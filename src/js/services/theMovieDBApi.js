import axios from 'axios';

const MUNAI_MOVIES_API_URL = import.meta.env.VITE_MUNAI_MOVIES_API_URL;
const MUNAI_MOVIES_API_TOKEN = import.meta.env.VITE_MUNAI_MOVIES_API_TOKEN;

const moviesApi = axios.create({
  baseURL: MUNAI_MOVIES_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${MUNAI_MOVIES_API_TOKEN}`
  },
  params: {
    // 'language': 'es-ES'
  }
});

const getTrendingMovies = async (timeWindow = 'week') => {
  try {
    const trendingMoviesResponse = await moviesApi.get(`${MUNAI_MOVIES_API_URL}/trending/movie/${timeWindow}`);
    const trendingMoviesData = trendingMoviesResponse.data;
    return trendingMoviesData.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getOnPremiereMovies = async () => {
  try {
    const onPremiereMoviesResponse = await moviesApi.get(`${MUNAI_MOVIES_API_URL}/movie/now_playing`);
    const onPremiereMoviesData = onPremiereMoviesResponse.data;
    return onPremiereMoviesData.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const getMovieGenres = async () => {
  try {
    const response = await moviesApi.get(`${MUNAI_MOVIES_API_URL}/genre/movie/list`);
    console.log(response)
    const data = response.data;
    return data.genres;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const api = {
  getTrendingMovies: async (timeWindow = 'week') => {
    try {
      const trendingMoviesResponse = await moviesApi.get(`${MUNAI_MOVIES_API_URL}/trending/movie/${timeWindow}`);
      const trendingMoviesData = trendingMoviesResponse.data;
      return trendingMoviesData.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getOnPremiereMovies: async () => {
    try {
      const onPremiereMoviesResponse = await moviesApi.get(`${MUNAI_MOVIES_API_URL}/movie/now_playing`);
      const onPremiereMoviesData = onPremiereMoviesResponse.data;
      return onPremiereMoviesData.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getMovieGenres: async () => {
    try {
      const response = await moviesApi.get(`${MUNAI_MOVIES_API_URL}/genre/movie/list`);
      console.log(response)
      const data = response.data;
      return data.genres;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getMoviesByGenreId: async (genreId) => {
    try {
      const response = await moviesApi.get(`${MUNAI_MOVIES_API_URL}/discover/movie`,{
        params: {
          with_genres: genreId
        }
      });
      const data = response.data;
      return data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
}

export {
  api
}