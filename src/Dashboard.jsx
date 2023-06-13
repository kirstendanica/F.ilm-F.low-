import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Dashboard.css';
import MovieCard from './Moviecard';

const Dashboard = () => {
  const [movies, setMovies] = useState({});
  const [currentPages, setCurrentPages] = useState({});
  const [totalPages, setTotalPages] = useState({});

  const API_KEY = '23a3a3efe425378b5ba9af95915b9be8';

  const fetchMovies = useCallback(async (section, page) => {
    const url = `https://api.themoviedb.org/3/movie/${section}?api_key=${API_KEY}&language=en-US&page=${page}&limit=4`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      setMovies((prevState) => ({ ...prevState, [section]: data.results }));
      setTotalPages((prevState) => ({ ...prevState, [section]: data.total_pages }));
    } catch (err) {
      console.error(err);
    }
  }, [API_KEY]);

  const handlePageChange = (section, newPage) => {
    if (newPage < 1 || newPage > (totalPages[section] || 1)) {
      return;
    }

    setCurrentPages((prevState) => ({ ...prevState, [section]: newPage }));
  };

  const sections = useMemo(() => [
    {
      title: 'Your Watchlist',
      apiSection: 'popular',
    },
    {
      title: 'Your Favorites',
      apiSection: 'top_rated',
    },
    {
      title: 'Trending',
      apiSection: 'trending',
      placeholderImage: 'https://source.unsplash.com/random/300x450',
    },
    {
      title: 'Recently Added',
      apiSection: 'new',
      placeholderImage: 'https://source.unsplash.com/random/300x450',
    },
  ], []);

  useEffect(() => {
    sections.forEach(({ apiSection }) => {
      fetchMovies(apiSection, currentPages[apiSection] || 1);
    });
  }, [sections, fetchMovies, currentPages]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      <div className="dashboard-content">
        {sections.map(({ title, apiSection, placeholderImage }) => (
          <div key={title} className="section">
            <div className="section-title">{title}</div>
            <div className="section-content">
              <div className="movies-grid">
                {(movies[apiSection] || []).map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
                {placeholderImage && (
                  <img src={placeholderImage} alt="placeholder" className="placeholder-image" />
                )}
              </div>
              <div className="pagination">
                <button onClick={() => handlePageChange(apiSection, (currentPages[apiSection] || 1) - 1)} className="pagination-button">
                  Previous
                </button>
                <span className="pagination-info">
                  Page {(currentPages[apiSection] || 1)} of {(totalPages[apiSection] || 1)}
                </span>
                <button onClick={() => handlePageChange(apiSection, (currentPages[apiSection] || 1) + 1)} className="pagination-button">
                  Next
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;