'use strict'

require('dotenv').config();

const express = require('express');
const getWeather = require('./weather');
const getMovies = require('./movie');
const cors = require('cors');

const app = express();


app.use(cors());

const PORT = process.env.PORT || 3002;

// GET WEATHER DATA
app.get('/weather', getWeather);
// GET MOVIE DATA
app.get('/movie', getMovies);



// ERRORS
app.get('*' , (req, res) => { 
    console.log('hitting all route');   
    res.status(404).send('Page not found here : error');
})    

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));