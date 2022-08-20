require('dotenv').config()
const request = require('request')

const { API_ACCESS_KEY, BASE_URL } = process.env

const forecast = (latitude, longitude, callback) => {
  const url = `${BASE_URL}/current?access_key=${API_ACCESS_KEY}&query=${latitude},${longitude}&units=m`

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (response.body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(
        undefined,
        response.body.current.weather_descriptions[0] +
          '. It is currently ' +
          response.body.current.temperature +
          ' degress out.'
      )
    }
  })
}

module.exports = forecast
