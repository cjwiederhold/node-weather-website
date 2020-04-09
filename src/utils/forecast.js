const request = require('request');

function forecast(lat, lon, callback) {
    const url = 'http://api.weatherstack.com/current?access_key=5271c20ab1695ecb826b8499f7d2359c&query=' + lon + ',' + lat + '&units=f';
    
    request ({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service.', undefined);
        } else if (body.error) {
            callback('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.');
        }   
    })

}

module.exports = forecast;