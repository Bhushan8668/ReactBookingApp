import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../actions/movieActions';
import { Link } from 'react-router-dom';
import '../styles/MovieListing.css'; 

const MovieListing = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.popularMovies);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (movie.genres && movie.genres.some(genre => genre.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="movie-listing-container">
      <header className="app-header">
        <h1 className="app-name">BookMyShow</h1>
        <Link to="/booking-history" className="booking-history-link">View Booking History</Link>
      </header>
      <h2 className="movie-listing-title">Popular Movies</h2>
      
      <input 
        type="text" 
        placeholder="Search by title or genre..." 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-input"
      />

      <div className="movie-list">
        {filteredMovies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <Link to={`/movies/${movie.id}`} className="movie-link">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="movie-poster"
              />
              <h2 className="movie-title">{movie.title}</h2>
              <p className="movie-overview">{movie.overview}</p>
            </Link>
            <Link to={`/movies/${movie.id}`}>
              <button className="view-details-button">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieListing;
