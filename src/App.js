
import { useState, useEffect } from 'react';

import Moviecard from './Moviecard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=99f8cabd'

const movie1 = {
        "Title": "Jurassic Park",
        "Year": "1993",
        "imdbID": "tt0107290",
        "Type": "movie",
        "Poster": "https://m.media-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg"
    }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Jurassic Park');
    }, []);



    return (
     <div className="app">
        <h1>FilmaLab</h1>

        <div className="search">
         <input
            placeholder="Search for films"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img 
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
                />
        </div>

        {movies?.length > 0
            ? (
            <div className="container">
                {movies.map((movie) => (
                    <Moviecard movie={movie} />
                ))}
            </div>
             ) : (
            <div className="empty">
                <h2>No movies found!</h2>
                </div>
             )
        }
     </div>
    );
}

export default App;