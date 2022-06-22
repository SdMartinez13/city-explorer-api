'use strict'

console.log('first server');

require('dotenv').config();
const weatherData = require('./data/weather.json');
const express = require('express');
const app = express();
// const axios = require('axios');
// const getWeather = require('./data/weather');

const cors = require('cors');
// const { response } = require('express');


app.use(cors());


const PORT = process.env.PORT || 3002;

app.get('/' , (req, res) => {
    return res.send('Welcome to our server');
}) 

app.get('/weather' ,(request, response) => {
    console.log('hitting weather route');
    let searchQueryCity = request.query.searchQueryCity;
    let cityWeather = weatherData.find((e) => e.city_name.toLowerCase() === searchQueryCity.toLowerCase());
    let selectedCity = cityWeather.data.map(dailyWeather => {
        return new Forecast(dailyWeather);
    });

    return response.send(selectedCity);

})

class Forecast {
    constructor(cityWeather) {
      this.date = cityWeather.datetime;
      this.description = cityWeather.weather.description;
    }
}

app.get('*' , (req, res) => { 
    console.log('hitting all route');   
    res.send('Page not found here : error');
})    


app.use((error, request, response, next) => {
    response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));