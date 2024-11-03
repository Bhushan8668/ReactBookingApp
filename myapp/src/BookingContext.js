import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);

  const handleBooking = (newBooking) => {
    setBookings((prev) => [...prev, newBooking]);
  };

  const cancelBooking = (bookingToCancel) => {
    setBookings((prev) => prev.filter(booking => booking !== bookingToCancel));
  };

  const isSeatBooked = (movieId, date, time, seat) => {
    return bookings.some(booking => 
      booking.movie === movieId && 
      booking.date === date && 
      booking.time === time && 
      booking.seats.includes(seat)
    );
  };

  return (
    <BookingContext.Provider value={{ bookings, handleBooking, cancelBooking, isSeatBooked }}>
      {children}
    </BookingContext.Provider>
  );
};