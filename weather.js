'use strict';

const axios = require('axios');
<<<<<<< HEAD:weather.js
const cache = require('./cache.js');

async function getWeather(latitude, longitude) {
  let lat = latitude;
  let lon = longitude;
  const key = 'weather: ' + lat + ', ' + lon;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
=======

let cache = require('./cache.js');

module.exports = getWeather;

async function getWeather(latitude, longitude) {
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;

>>>>>>> main:Modules/weather.js

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('cache hit');
  } else {
    console.log('cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    cache[key].data = await axios.get(url)
    .then(response => parseWeather(response.data));
  }
  console.log(cache[key]);

  return cache[key].data;
}

function parseWeather(weatherData) {
  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Weather {
  constructor(day) {
    // console.log(day, 'day from Weather constructor')
    
    this.date = day.datetime;
    this.description = day.weather.description;
    this.temp = day.temp;
    this.min_temp = day.min_temp;
    this.max_temp = day.max_temp;
    // console.log(cityWeather);
  }
}