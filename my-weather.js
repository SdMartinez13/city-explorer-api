'use strict'

const axios = require('axios');

async function getWeather(req,res){
    try{
      let lat = req.query.lat;
      let lon = req.query.lon;
      let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=3&lat=${lat}&lon=${lon}`;
      let result = await axios.get(url);
    //   console.log(result);
      let groomedData = result.data.data.map(dailyWeather => new Forecast(dailyWeather));
      res.status(200).send(groomedData);
    }
    catch(error){
      res.status(500).send(`Error getting weather: ${error.status}. ${error.message}`);
    }
  }

class Forecast {
    constructor(cityWeather) {
        this.date = cityWeather.datetime;
        this.description = cityWeather.weather.description;
        this.temp = cityWeather.temp;
        this.min_temp = cityWeather.min_temp;
        this.max_temp = cityWeather.max_temp;
        // console.log(cityWeather);
    }
}

module.exports = getWeather;