import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import { useBooking } from '../BookingContext'; 
import SeatSelection from '../components/SeatSelection'; 

jest.mock('../BookingContext', () => ({
  useBooking: jest.fn(),
}));

describe('SeatSelection Component', () => {
  const mockHandleBooking = jest.fn();
  const mockBookings = [];

  beforeEach(() => {
    useBooking.mockReturnValue({
      handleBooking: mockHandleBooking,
      bookings: mockBookings,
    });
  });

  const setup = (props) => {
    return render(
      <MemoryRouter>
        <SeatSelection {...props} />
      </MemoryRouter>
    );
  };

//   it('renders the component with the correct props', () => {
//     const { getByText } = setup({
//       movieId: '1',
//       movieTitle: 'Test Movie',
//       movieImage: 'test-image.jpg',
//       date: '2023-10-01',
//       time: '18:00',
//       onClose: jest.fn(),
//     });

  
//     expect(getByText('Test Movie')).toBeInTheDocument();
//     expect(getByText('Book Show')).toBeInTheDocument();
// });

  it('selects and deselects seats correctly', () => {
    const { getByLabelText } = setup({
      movieId: '1',
      movieTitle: 'Test Movie',
      movieImage: 'test-image.jpg',
      date: '2023-10-01',
      time: '18:00',
      onClose: jest.fn(),
    });

    const seatA1 = getByLabelText('A1');
    const seatA2 = getByLabelText('A2');

    fireEvent.click(seatA1);
    expect(seatA1.checked).toBe(true);

    fireEvent.click(seatA1);
    expect(seatA1.checked).toBe(false);

    fireEvent.click(seatA1);
    fireEvent.click(seatA2);
    expect(seatA1.checked).toBe(true);
    expect(seatA2.checked).toBe(true);
  });

  it('shows alert when trying to confirm without selecting seats', () => {
    global.alert = jest.fn(); 
    const { getByText } = setup({
      movieId: '1',
      movieTitle: 'Test Movie',
      movieImage: 'test-image.jpg',
      date: '2023-10-01',
      time: '18:00',
      onClose: jest.fn(),
    });

    fireEvent.click(getByText('Book Show'));
    expect(global.alert).toHaveBeenCalledWith('Please select at least one seat.');
  });

  it('confirms booking and calls handleBooking with correct parameters', async () => {
    const { getByLabelText, getByText } = setup({
      movieId: '1',
      movieTitle: 'Test Movie',
      movieImage: 'test-image.jpg',
      date: '2023-10-01',
      time: '18:00',
      onClose: jest.fn(),
    });

    fireEvent.click(getByLabelText('A1'));
    fireEvent.click(getByText('Book Show'));
    fireEvent.click(getByText('Confirm'));

    await waitFor(() => {
      expect(mockHandleBooking).toHaveBeenCalledWith({
        movie: '1',
        date: '2023-10-01',
        time: '18:00',
        seats: ['A1'],
        movieTitle: 'Test Movie',
        movieImage: 'test-image.jpg',
        totalPrice: 10, 
      });
    });
  });

  it('renders booked seats as disabled', () => {
    mockBookings.push({
      movie: '1',
      date: '2023-10-01',
      time: '18:00',
      seats: ['A1'],
    });

    const { getByLabelText } = setup({
      movieId: '1',
      movieTitle: 'Test Movie',
      movieImage: 'test-image.jpg',
      date: '2023-10-01',
      time: '18:00',
      onClose: jest.fn(),
    });

    const seatA1 = getByLabelText('A1');
    expect(seatA1.disabled).toBe(true);
  });
});