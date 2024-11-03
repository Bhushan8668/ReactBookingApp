export const bookShowtime = (showtime) => ({
    type: 'BOOK_SHOWTIME',
    payload: showtime,
  });
  
  export const cancelBooking = (showtime) => ({
    type: 'CANCEL_BOOKING',
    payload: showtime,
  });