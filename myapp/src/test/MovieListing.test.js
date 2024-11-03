import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieListing from '../components/MovieListing';
import reducer from '../reducers'; 

const createMockStore = (initialState) => {
  return createStore(reducer, initialState);
};

describe('MovieListing Component', () => {
  it('renders popular movies correctly', async () => {
    
    const initialState = {
      movies: {
        popularMovies: [
          {
            id: 1,
            title: 'Movie 1',
            poster_path: '/path/to/poster1.jpg',
            overview: 'This is a movie overview.',
            genres: ['Action', 'Adventure'],
          },
          {
            id: 2,
            title: 'Movie 2',
            poster_path: '/path/to/poster2.jpg',
            overview: 'This is another movie overview.',
            genres: ['Comedy', 'Drama'],
          },
        ],
      },
    };

    const store = createMockStore(initialState);

    const { getByText, getByRole } = render(
      <Provider store={store}>
        <Router>
          <MovieListing />
        </Router>
      </Provider>
    );

    expect(getByText('BookMyShow')).toBeInTheDocument();
    expect(getByText('View Booking History')).toBeInTheDocument();
    expect(getByText('Popular Movies')).toBeInTheDocument();
    expect(getByText('Movie 1')).toBeInTheDocument();
    expect(getByText('Movie 2')).toBeInTheDocument();

    const searchInput = getByRole('textbox'); 
    fireEvent.change(searchInput, { target: { value: 'Action' } });

    await waitFor(() => {
      expect(getByText('Movie 1')).toBeInTheDocument();
      expect(getByText('Movie 2')).not.toBeInTheDocument(); 
    });
  });
});
