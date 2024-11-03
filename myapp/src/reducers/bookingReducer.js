const initialState = {
    bookings: [],
    showtimes: [
      { id: 1, time: '10:00 AM', booked: false },
      { id: 2, time: '1:00 PM', booked: false },
      { id: 3, time: '4:00 PM', booked: false },
      { id: 4, time: '7:00 PM', booked: false },
    ],
  };
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'BOOK_SHOWTIME':
        return {
          ...state,
          bookings: [...state.bookings, action.payload],
          showtimes: state.showtimes.map(showtime =>
            showtime.id === action.payload.id ? { ...showtime, booked: true } : showtime
          ),
        };
      case 'CANCEL_BOOKING':
        return {
          ...state,
          bookings: state.bookings.filter(booking => booking.id !== action.payload.id),
          showtimes: state.showtimes.map(showtime =>
            showtime.id === action.payload.id ? { ...showtime, booked: false } : showtime
          ),
        };
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  