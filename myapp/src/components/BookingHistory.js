import React from 'react';
import { useBooking } from '../BookingContext';
import '../styles/BookingHistory.css'; 

const BookingHistory = () => {
  const { bookings, cancelBooking } = useBooking();

  return (
    <div className="booking-history"> 
      <h1>Booking History</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking, index) => (
            <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <img 
                src={booking.movieImage} 
                alt={booking.movieTitle} 
                className="booking-image" 
              />
              <div>
                <strong>{booking.movieTitle}</strong> at {booking.time} on {booking.date}
                <p>Seats: {booking.seats.join(', ')}</p>
                <p>Total Price: ${booking.totalPrice}</p>
                <button onClick={() => cancelBooking(booking)}>Cancel Booking</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
