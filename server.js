'use strict';

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const weather = require('./modules/weather.js');
const movies = require('./modules/movie');

const app = express();

const PORT = process.env.PORT || 3002

app.get('/weather', getWeather);
app.get('/movie', getMovies);

app.use(cors());


function getWeather(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

function getMovies(request, response) {
  const city = request.query.searchQueryCity;
  movies(city)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Trouble getting movies!');
    });
}

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));