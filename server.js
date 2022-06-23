'use strict'

console.log('first server');

require('dotenv').config();
// const weatherData = require('./data/weather.json');
const express = require('express');
const app = express();
// const axios = require('axios');
const getWeather = require('./weather.js');
const getMovies = require('./movie.js');


const cors = require('cors');
// const { response } = require('express');
// const res = require('express/lib/response');


app.use(cors());


const PORT = process.env.PORT || 3002;


async function handleWeather (req, res) {
    let searchQueryCity = req.query.searchQueryCity;
    // let { searchQueryCity } = req.query;


    // neq query to use lat & lon

    const { lat, lon } = req.query;

    console.log(lat, lon, searchQueryCity, 'lat and lon from frontned query')


    try {
        // let response =  await getWeather({cityName: searchQueryCity});


        let response =  await getWeather({ lat, lon });
        console.log(response, 'response two from weater api')

       res.send(response); 
    } catch (error) {
       console.log(error); 
    }
}

async function handleMovie (req, res) {
    let movieQueryCity = req.query.movieQueryCity;
    try {
        let response =  await getMovies(movieQueryCity);
       res.send(response); 
    } catch (error) {
       console.log(error); 
    }
}


app.get('/' , (req, res) => {
    return res.send('Welcome to our server');
}) 


// GET WEATHER DATA
app.get('/weather', handleWeather);
// GET MOVIE DATA
app.get('/movies', handleMovie);


// ERRORS
app.get('*' , (req, res) => { 
    console.log('hitting all route');   
    res.send('Page not found here : error');
})    


app.use((error, request, response, next) => {
    response.status(500).send('this is the error', error.message);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));