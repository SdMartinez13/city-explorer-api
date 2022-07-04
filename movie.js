

'use strict'

const axios = require('axios');
<<<<<<< HEAD:movie.js
const cache = require('./cache.js');

async function getMovies(city) {
  let cityName = city;
  const key = 'movie: ' + cityName;
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('cache hit');
  } else {
    console.log('cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseMovies(response.data));
  }
  return cache[key].data;
}

function parseMovies(movieData) {
  try {
    const movieSummaries = movieData.results.map(movie => {
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = getMovies;
=======

async function getMovies(cityName) {

    try {
        
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`
        let cityMovie = await axios.get(url);
      
        let selectedMovie = cityMovie.data.results.map(dailyMovie => {
            return new Movie(dailyMovie);
        
        });
        // console.log(selectedMovie);
        return selectedMovie;
    
    } catch (error) {
        console.log(error.message);
    }
}
>>>>>>> main:Modules/movie.js
class Movie {
    constructor(cityMovie) {
        this.title = cityMovie.original_title;
        this.description = cityMovie.overview;
        this.avgVotes = cityMovie.vote_average;
        this.totalVotes = cityMovie.vote_count;
        this.popularity = cityMovie.popularity;
        this.releasedOn = cityMovie.released_date;
        this.img = cityMovie.poster_path;
    }
}
module.exports = getMovies;