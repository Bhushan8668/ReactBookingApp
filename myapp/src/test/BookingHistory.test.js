import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingProvider } from '../BookingContext';
import BookingHistory from '../components/BookingHistory';

describe('BookingHistory Component', () => {
  const mockBookings = [
    {
      movieImage: 'image1.jpg',
      movieTitle: 'Movie Title 1',
      time: '7:00 PM',
      date: '2023-10-31',
      seats: ['A1', 'A2'],
      totalPrice: 20,
    },
  ];

  const mockCancelBooking = jest.fn();

  const renderComponent = (bookings, cancelBooking) => {
    render(
      <BookingProvider value={{ bookings, cancelBooking }}>
        <BookingHistory />
      </BookingProvider>
    );
  };

  test('renders "No bookings found." message when there are no bookings', () => {
    renderComponent([], mockCancelBooking);
    expect(screen.getByText(/no bookings found/i)).toBeInTheDocument();
  });

  test('renders booking details when there are bookings', () => {
    renderComponent(mockBookings, mockCancelBooking);
    
    expect(screen.getByText(/booking history/i)).toBeInTheDocument();
    expect(screen.getByText(/movie title 1/i)).toBeInTheDocument();
    expect(screen.getByText(/7:00 PM/i)).toBeInTheDocument();
    expect(screen.getByText(/2023-10-31/i)).toBeInTheDocument();
    expect(screen.getByText(/seats: A1, A2/i)).toBeInTheDocument();
  });

  test('calls cancelBooking when the cancel button is clicked', () => {
    renderComponent(mockBookings, mockCancelBooking);

    const cancelButton = screen.getByRole('button', { name: /cancel booking/i });
    expect(cancelButton).toBeInTheDocument();
    
    fireEvent.click(cancelButton);
    expect(mockCancelBooking).toHaveBeenCalledWith(mockBookings[0]);
  });
});
