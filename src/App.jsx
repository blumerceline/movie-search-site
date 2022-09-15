import React, { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';
import Movie from './Movie.jsx';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=4ff5a25d';

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    
    // create asynchronous request
    const searchMovies = async (title) =>{
        // collect title of movie
        const response = await fetch(`${API_URL}&s=${title}`);
        // turn response into data format
        const data = await response.json();

        setMovies(data.Search);
    }

    // this will call api for first time
    useEffect(() => {
        searchMovies('Legally blonde');
    },[]);

    const handleEnterKey = (e) =>{
        if(e.key === 'Enter'){
            searchMovies(searchTerm);
        }
    };

    return(
        <div className="app">
            <h1>Movie List</h1>

            <div className='search'>
                <input placeholder='Search for a movie' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleEnterKey} />
                <img src={SearchIcon} alt="search" onClick={()=>searchMovies(searchTerm)}/>
            </div>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <Movie movie={movie}/>
                    ))}
                </div>
            ):(
                <div className='empty'>
                    <h2>No movies found</h2>
                </div>
            )}

        </div>
    );
}

export default App;