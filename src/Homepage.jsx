import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">F.ilm F.low</h1>
          <p className="hero-subtitle">
            A treasure trove of film and TV.
            <br />
            Find your flow and never look back.
          </p>
          <Link className="hero-cta" to="/search">
            BEGIN
          </Link>
          <Link className="hero-cta dashboard-link" to="/Dashboard">
            DASHBOARD
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Homepage;