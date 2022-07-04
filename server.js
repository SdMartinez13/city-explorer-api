'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

<<<<<<< HEAD
const weather = require('./weather.js');
const movies = require('./movie.js');
// const cache = require('./Modules/cache');
=======
const weather = require('./modules/weather.js');
const movies = require('./modules/movie');
>>>>>>> main

const app = express();

const PORT = process.env.PORT || 3002

app.get('/weather', getWeather);
app.get('/movie', getMovies);

app.use(cors());

<<<<<<< HEAD
const PORT = process.env.PORT || 3002;

app.get('/weather', weatherHandler);

app.get('/movies', movieHandler);

app.get('*', (request, response) => {
  response.status(404).send('The route you entered does not exist.');
});

function weatherHandler(request, response) {
=======

function getWeather(request, response) {
>>>>>>> main
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

<<<<<<< HEAD
function movieHandler(request, response) {
  const city = request.searchQueryCity.city;
=======
function getMovies(request, response) {
  const city = request.query.searchQueryCity;
>>>>>>> main
  movies(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Trouble getting movies!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));