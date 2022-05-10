const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8494559cd9ee39c7717a33b895058189&query=' + latitude + ',' + longtitude
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('cannot connect to weather api', undefined)
        } else if (body.error) {
            callback('unable to find location', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0] + ". It has currently " + body.current.temperature + " degree and it feels like " + body.current.feelslike + " degree!")
        }
    })
}

module.exports = forecast