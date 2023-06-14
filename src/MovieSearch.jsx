import React, { useState, useEffect } from 'react';
import MovieCard from './Moviecard';
import './MovieSearch.css';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [mostPopularMovie, setMostPopularMovie] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [popularMovies, setPopularMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const API_KEY = '23a3a3efe425378b5ba9af95915b9be8';

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchPopularMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    );
    const data = await response.json();
    const shuffledMovies = shuffleArray(data.results);
    setPopularMovies(shuffledMovies);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  const searchMovies = async (e) => {
    e.preventDefault();

    if (searchTerm) {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${searchTerm}`;

      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
        setMostPopularMovie(null);
        setTotalPages(data.total_pages);
        setSearchPerformed(true);
      } catch (err) {
        console.error(err);
      }

      setSearchTerm('');
    }
  };

  const handleScroll = (direction) => {
    const scrollContainer = document.querySelector('.movie-container');
    const scrollAmount = 200;

    if (direction === 'left') {
      scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="search-container">
      <h1 className="search-title">Find what you want</h1>
      <form className="search-form" onSubmit={searchMovies}>
        <input
          type="text"
          className="search-input"
          placeholder="All you need is one word:"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          SEARCH
        </button>
      </form>
      <div className="recommended-container">
        <h2 className="recommended-title">
          Welcome!
          <br />
          Here are some recommendations to get started...
        </h2>
        <button className="scroll-arrow left" onClick={() => handleScroll('left')}>
          &lt;
        </button>
        <div className="movie-container">
          {popularMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        <button className="scroll-arrow right" onClick={() => handleScroll('right')}>
          &gt;
        </button>
      </div>
      <div className="search-results-container">
        {searchPerformed && (
          <>
            <h2 className="search-results-title">Search Results</h2>
            <button className="scroll-arrow left" onClick={() => handleScroll('left')}>
              &lt;
            </button>
            <div className="movie-container">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
              {!movies.length && <p className="empty">No movies found</p>}
            </div>
            <button className="scroll-arrow right" onClick={() => handleScroll('right')}>
              &gt;
            </button>
          </>
        )}
      </div>
      {/* Add pagination if needed */}
    </div>
  );
};

export default MovieSearch;