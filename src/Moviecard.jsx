import React from 'react';
import './Moviecard.css';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="image-wrapper">
        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        <div className="overlay">
          {/* Include any desired overlay content here, such as movie.description */}
          <p>{movie.overview}</p>
        </div>
      </div>
      <h3>{movie.title}</h3>
    </div>
  );
};

export default MovieCard;