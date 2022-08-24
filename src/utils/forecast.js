require('dotenv').config()
const request = require('request')

const { API_ACCESS_KEY, BASE_URL } = process.env

const forecast = (latitude, longitude, callback) => {
  const url = `${BASE_URL}/current?access_key=${API_ACCESS_KEY}&query=${latitude},${longitude}&units=m`

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          '. It is currently ' +
          body.current.temperature +
          ' degress out. It feels like ' +
          body.current.feelslike +
          ' degress out. The humidity is ' +
          body.current.humidity +
          '%.'
      )
    }
  })
}

module.exports = forecast
