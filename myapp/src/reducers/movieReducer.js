import { FETCH_POPULAR_MOVIES, FETCH_MOVIE_DETAILS } from '../actions/movieActions';

const initialState = {
  popularMovies: [],
  selectedMovie: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POPULAR_MOVIES:
      return { ...state, popularMovies: action.payload };
    case FETCH_MOVIE_DETAILS:
      return { ...state, selectedMovie: action.payload };
    default:
      return state;
  }
};

export default movieReducer;