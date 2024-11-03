import React from 'react';
import Modal from 'react-modal';
import SeatSelection from './SeatSelection';

const BookingModal = ({ isOpen, onRequestClose, showTimes }) => {
  const handleConfirmBooking = (selectedSeats) => {
    console.log('Booked seats:', selectedSeats);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Book a Show</h2>
      <SeatSelection onConfirm={handleConfirmBooking} onCancel={onRequestClose} />
    </Modal>
  );
};

export default BookingModal;