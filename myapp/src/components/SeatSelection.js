import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../BookingContext';
import '../styles/SeatSelection.css'; 

const pricePerTicket = 10; 

const SeatSelection = ({ movieId, movieTitle, movieImage, date, time, onClose }) => {
  const { handleBooking, bookings } = useBooking();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const rows = ['A', 'B', 'C'];
  const seatsPerRow = 10;

  const toggleSeat = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleConfirm = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    setShowConfirmation(true);
  };

  const handleModalConfirm = () => {
    const totalPrice = selectedSeats.length * pricePerTicket;
    const newBooking = {
      movie: movieId,
      date,
      time,
      seats: selectedSeats,
      movieTitle,
      movieImage, 
      totalPrice,
    };

    handleBooking(newBooking);

    alert(`Your ticket is booked! 
      Movie: ${movieTitle} 
      Selected seats: ${selectedSeats.join(', ')} 
      Date: ${date} 
      Time: ${time} 
      Total Price: $${totalPrice}`);

    onClose();
    navigate('/');
  };

  const isSeatBooked = (seat) => {
    return bookings.some((booking) => {
      return (
        booking.movie === movieId &&
        booking.date === date &&
        booking.time === time &&
        booking.seats.includes(seat)
      );
    });
  };

  return (
    <div>

      <div className="checkbox-container">
        {rows.map((row) => (
          <div key={row} className="row">
            {Array.from({ length: seatsPerRow }, (_, index) => {
              const seat = `${row}${index + 1}`;
              const isBooked = isSeatBooked(seat);
              return (
                <label key={seat} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={selectedSeats.includes(seat)}
                    disabled={isBooked}
                    onChange={() => toggleSeat(seat)}
                  />
                  {seat}
                </label>
              );
            })}
          </div>
        ))}
      </div>
      <div className="button-container">
        <button onClick={handleConfirm} className="book-button">Book Show</button>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <h4>Confirm Your Booking</h4>
          <p>Movie: {movieTitle}</p>
          <p>Selected Seats: {selectedSeats.join(', ')}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Total Price: ${selectedSeats.length * pricePerTicket}</p>
          <div className="button-container">
            <button onClick={handleModalConfirm}>Confirm</button>
            <button onClick={() => setShowConfirmation(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
