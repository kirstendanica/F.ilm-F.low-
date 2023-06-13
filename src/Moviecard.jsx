import React from 'react';
import './Moviecard.css';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const Moviecard = ({ movie }) => {
  const { title, release_date: releaseDate, poster_path: posterPath, overview } = movie;

  return (
    <div className="movie-card">
      <div className="movie-card-image">
        {posterPath ? (
          <img
            src={`${IMAGE_BASE_URL}${posterPath}`}
            alt={`${title} poster`}
            style={{ aspectRatio: '2 / 3' }}
          />
        ) : (
          <div className="movie-card-image-placeholder">No Image</div>
        )}
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{title}</h3>
        <p className="movie-card-date">Release Date: {releaseDate}</p>
        <p className="movie-card-overview">{overview}</p>
      </div>
    </div>
  );
};

export default Moviecard;