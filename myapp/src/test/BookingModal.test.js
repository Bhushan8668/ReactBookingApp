import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingModal from '../components/BookingModal'; 

jest.mock('../components/SeatSelection', () => {
  return function MockSeatSelection({ onConfirm, onCancel }) {
    return (
      <div>
        <button onClick={() => onConfirm(['A1', 'A2'])}>Confirm</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    );
  };
});

describe('BookingModal Component', () => {
  test('renders correctly when open', () => {
    render(<BookingModal isOpen={true} onRequestClose={jest.fn()} showTimes={[]} />);

    expect(screen.getByText(/book a show/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm/i)).toBeInTheDocument();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
  });

  test('calls onRequestClose when the modal is closed', () => {
    const onRequestCloseMock = jest.fn();
    render(<BookingModal isOpen={true} onRequestClose={onRequestCloseMock} showTimes={[]} />);

    fireEvent.click(screen.getByText(/cancel/i));
    expect(onRequestCloseMock).toHaveBeenCalled();
  });

  test('calls handleConfirmBooking with selected seats', () => {
    const consoleSpy = jest.spyOn(console, 'log'); 
    render(<BookingModal isOpen={true} onRequestClose={jest.fn()} showTimes={[]} />);

    fireEvent.click(screen.getByText(/confirm/i));
    expect(consoleSpy).toHaveBeenCalledWith('Booked seats:', ['A1', 'A2']);
    
    consoleSpy.mockRestore(); 
  });
});