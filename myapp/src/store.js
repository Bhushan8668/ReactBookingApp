import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; 
import movieReducer from './reducers/movieReducer';
import bookingReducer from './reducers/bookingReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  bookings: bookingReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;