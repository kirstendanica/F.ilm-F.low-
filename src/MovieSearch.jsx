import React, { useState, useEffect } from 'react';
import './MovieSearch.css';
import MovieCard from './Moviecard';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPopularMovies = async () => {
    const API_KEY = '23a3a3efe425378b5ba9af95915b9be8';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
    }
  };

  const searchMovies = async (e, page = 1) => {
    e.preventDefault();
    const API_KEY = '23a3a3efe425378b5ba9af95915b9be8';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (err) {
      console.error(err);
    } finally {
      setSearchPerformed(true);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) {
      return;
    }
    setCurrentPage(newPage);
    searchMovies({ preventDefault: () => {} }, newPage);
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <div className="search-container">
      <h1 className="search-title">Movie Search</h1>
      <div className="search-form-container">
        <form className="search-form" onSubmit={searchMovies}>
          <input
            className="search-input"
            type="text"
            name="query"
            placeholder="Search for a movie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
      <div className="movie-container">
        {searchPerformed ? (
          movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <div className="empty">No movies found</div>
          )
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} className="pagination-button">
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} className="pagination-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieSearch;