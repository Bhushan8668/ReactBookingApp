import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetails } from '../actions/movieActions';
import { useParams } from 'react-router-dom';
import BookingModal from './BookingModal';
import SeatSelection from './SeatSelection'; 
import Modal from 'react-modal'; 
import '../styles/MovieDetails.css'; 

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.movies.selectedMovie);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSeatSelectionOpen, setIsSeatSelectionOpen] = useState(false); 
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  if (!movie) {
    return <div>Loading...</div>; 
  }

  const today = new Date().toISOString().split('T')[0];
  const showTimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM']; 

  return (
    <div className="movie-details">
      <div className="header">
        <h1>{movie.title}</h1>
      </div>

      <div className="details-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
        
        <div className="booking-section">
          <div className="time-selection">
            <label>
              Date:
              <input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)} 
                min={today} 
              />
            </label>
            <label>
              Time:
              <select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
                <option value="">Select a time</option>
                {showTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </label>
          </div>
          <button onClick={() => setIsSeatSelectionOpen(true)} disabled={!selectedDate || !selectedTime}>
            Book Show
          </button>
          <p>please select date and show timing</p>
          <p>Price : 10$ /per Ticket</p>
        </div>
      </div>

      <p><strong>Overview:</strong> {movie.overview || 'N/A'}</p>
      <p><strong>Genres:</strong> {movie.genres && movie.genres.length > 0 ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
      <p><strong>Rating:</strong> {movie.vote_average ? movie.vote_average : 'N/A'} / 10</p>

      <h3>Cast:</h3>
      <div className="cast-container">
        {movie.cast && movie.cast.length > 0 ? (
          movie.cast.map(member => (
            <div key={member.id} className="cast-member">
              <img 
                src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} 
                alt={member.name} 
                className="cast-image" 
              />
              <span className="cast-name">{member.name}</span>
            </div>
          ))
        ) : (
          <p>No cast information available.</p>
        )}
      </div>
      
      <Modal 
        isOpen={isSeatSelectionOpen} 
        onRequestClose={() => setIsSeatSelectionOpen(false)} 
        contentLabel="Seat Selection"
      >
        <h2>Select Your Seats for {movie.title}</h2>
        <SeatSelection 
          movieId={id}
          movieTitle={movie.title}
          movieImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          date={selectedDate}
          time={selectedTime}
          onClose={() => setIsSeatSelectionOpen(false)} 
        />
        <button onClick={() => setIsSeatSelectionOpen(false)}>Close</button>
      </Modal>

      <BookingModal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        showTimes={showTimes} 
      />
    </div>
  );
};

export default MovieDetails;
