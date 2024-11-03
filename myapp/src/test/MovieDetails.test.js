import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails'; 
import { fetchMovieDetails } from '../actions/movieActions'; 
import { BookingProvider } from '../BookingContext'; 

jest.mock('../actions/movieActions', () => ({
  fetchMovieDetails: jest.fn(),
}));

const mockStore = configureStore([]);

describe('MovieDetails Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: {
        selectedMovie: {
          title: 'Movie Title',
          poster_path: '/path/to/poster.jpg',
          overview: 'This is a movie overview.',
          genres: [{ name: 'Action' }, { name: 'Adventure' }],
          vote_average: 8.5,
          cast: [
            { id: 1, name: 'Actor One', profile_path: '/path/to/actor1.jpg' },
            { id: 2, name: 'Actor Two', profile_path: '/path/to/actor2.jpg' },
          ],
        },
      },
    });
    store.dispatch = jest.fn(); 
  });

//   test('renders movie details correctly', () => {
//     render(
//       <Provider store={store}>
//         <Router>
//           <BookingProvider value={{ handleBooking: jest.fn(), bookings: [] }}>
//             <MovieDetails />
//           </BookingProvider>
//         </Router>
//       </Provider>
//     );
  
//     expect(screen.getByText(/movie title/i)).toBeInTheDocument();
//     expect(screen.getByText(/this is a movie overview/i)).toBeInTheDocument();
//     expect(screen.getByText(/action, adventure/i)).toBeInTheDocument();
//     expect(screen.getByText(/rating:/i)).toHaveTextContent('Rating: 8.5'); 
//     expect(screen.getByText(/actor one/i)).toBeInTheDocument();
//     expect(screen.getByText(/actor two/i)).toBeInTheDocument();
//   });

  test('opens seat selection modal when "Book Show" button is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <BookingProvider value={{ handleBooking: jest.fn(), bookings: [] }}>
            <MovieDetails />
          </BookingProvider>
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-10-31' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '10:00 AM' } });

    const bookShowButton = screen.getByRole('button', { name: /book show/i });
    fireEvent.click(bookShowButton);

    expect(screen.getByText(/select your seats for movie title/i)).toBeInTheDocument();
  });

  test('closes seat selection modal when close button is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <BookingProvider value={{ handleBooking: jest.fn(), bookings: [] }}>
            <MovieDetails />
          </BookingProvider>
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2023-10-31' } });
    fireEvent.change(screen.getByLabelText(/time/i), { target: { value: '10:00 AM' } });

    const bookShowButton = screen.getByRole('button', { name: /book show/i });
    fireEvent.click(bookShowButton);

    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText(/select your seats for movie title/i)).not.toBeInTheDocument();
  });
});