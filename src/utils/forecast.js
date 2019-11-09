const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/6b26431fb82cfb70aff6ea1762fab755/' + longitude + ',' + latitude + "?units=si&lang=pt"

    request({
        url,
        json: true
    }, (error, { body } ) => {

        if (error) {
            callback('Unabled to connect to server!', undefined)
        } else if (body.error) {
            callback('Unabled to find location!', undefined)
        } else {
            callback(undefined, 'it is currently: ' + body.currently.temperature + " degree out. There is a " +
                body.currently.precipProbability + " chance of rain")

        }
    })
}

module.exports = forecast