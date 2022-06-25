'use strict'

const axios = require('axios');


async function getMovies(req, res) {
    
    try {
        
        let searchQueryCity = req.query.searchQueryCity;
        console.log('hello from the movies')
        console.log(searchQueryCity);
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQueryCity}`
        console.log(url);
        let result = await axios.get(url);
        

        let groomedData = result.data.results.map(dailyMovie => new Movie(dailyMovie));
        res.status(200).send(groomedData);    
               
    }

catch(error){
    res.status(500).send(`error ${error.status}. ${error.message}`);

    }
}

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