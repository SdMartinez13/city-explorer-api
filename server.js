'use strict'

console.log('first server');

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const app = express();
const axios = require('axios');
const getWeather = require('./weather.js');
const getMovies = require('./movie.js');


const cors = require('cors');
const { response } = require('express');
const res = require('express/lib/response');


app.use(cors());


const PORT = process.env.PORT || 3002;


app.get('/' , (req, res) => {
    return res.send('Welcome to our server');
}) 


// GET WEATHER DATA
app.get('/weather', getWeather);
// GET MOVIE DATA
app.get('/movies', getMovies);


// ERRORS
app.get('*' , (req, res) => { 
    console.log('hitting all route');   
    res.send('Page not found here : error');
})    


app.use((error, request, response, next) => {
    response.status(500).send(error.message);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));