import axios from 'axios';

const API_KEY = "ce20615f01a07c6dd8d9f90bca6aa8de";

export const FETCH_POPULAR_MOVIES = 'FETCH_POPULAR_MOVIES';
export const FETCH_MOVIE_DETAILS = 'FETCH_MOVIE_DETAILS';

export const fetchPopularMovies = () => async (dispatch) => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
    dispatch({ type: FETCH_POPULAR_MOVIES, payload: response.data.results });
  } catch (error) {
    console.error("Error fetching popular movies", error);
  }
};

export const fetchMovieDetails = (id) => async (dispatch) => {
  try {
    const [movieResponse, creditsResponse] = await Promise.all([
      axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`),
      axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
    ]);

    const movie = movieResponse.data;
    const credits = creditsResponse.data;

    const movieDetails = {
      ...movie,
      cast: credits.cast,
      crew: credits.crew,
    };

    dispatch({ type: FETCH_MOVIE_DETAILS, payload: movieDetails });
  } catch (error) {
    console.error("Error fetching movie details", error);
  }
};