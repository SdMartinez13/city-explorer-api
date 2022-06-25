'use strict';

const axios = require('axios');
let cache = require('./modules/cache.js');

async function getMovies(city){
  let cityName=city;
  const key = 'movie: ' + cityName;
  let url=`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  }else{
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
      .then(response => parseMovies(response.data));
  }
  return cache[key].data;
}

function parseMovies(movieData){
  try{
    const movieSummaries=movieData.results.map(movie=>{
      return new Movie(movie);
    });
    return Promise.resolve(movieSummaries);
  }catch(e){
    return Promise.reject(e);
  }
}

module.exports=getMovies;
class Movie {
  constructor(cityMovie) {
    this.title = cityMovie.original_title;
    this.description = cityMovie.overview;
    this.avgVotes = cityMovie.vote_average;
    this.totalVotes = cityMovie.vote_count;
    this.popularity = cityMovie.popularity;
    this.releasedOn = cityMovie.release_date;
    this.img = cityMovie.poster_path;
  }
}