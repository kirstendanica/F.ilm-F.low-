import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import MovieSearch from './MovieSearch';
import Dashboard from './Dashboard';
import searchIcon from './search.svg';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchMovies = async () => {
    const API_KEY = 'your_api_key_here';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`;

    const response = await fetch(url);
    const movieData = await response.json();
    setMovies(movieData.results);
    setSearchPerformed(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchMovies();
  };

  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <Link to="/" className="app-logo">
            F.ilm F.low
          </Link>
          <div className="search">
            <Link to="/search">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
                <img src={searchIcon} alt="search" />
              </form>
            </Link>
          </div>
        </header>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/search"
            element={<MovieSearch movies={movies} searchPerformed={searchPerformed} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;