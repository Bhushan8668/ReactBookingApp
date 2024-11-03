import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { BookingProvider } from './BookingContext';
import MovieListing from './components/MovieListing';
import MovieDetails from './components/MovieDetails';
import BookingHistory from './components/BookingHistory';

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<MovieListing />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/booking-history" element={<BookingHistory />} />
          </Routes>
        </div>
      </Router>
    </BookingProvider>
  );
};

export default App;