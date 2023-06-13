import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Homepage from './Homepage';
import MovieSearch from './MovieSearch';
import Dashboard from './Dashboard';
import searchIcon from './search.svg';

const App = () => {
  return (
    <div className="app">
      <Router>
        <header className="app-header">
          <Link to="/" className="app-logo">F.ilm F.low</Link>
          <div className="search">
            <Link to="/search">
              <input type="text" placeholder="Search" />
              <img src={searchIcon} alt="Search icon" />
            </Link>
          </div>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;