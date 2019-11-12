const path = require('path')
const express = require('express')
const hsb = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hsb.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paulo César R. Gonçalves'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Weather',
        name: 'Paulo César R. Gonçalves'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Weather',
        name: 'Paulo César R. Gonçalves'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
            if (error) {
                return res.send({ error })
            }

            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }

                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                })                
            })
        })
    }


})

app.get('/help/*', (req, res) => {
    res.send('My 404 page')
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Paulo César Rufino Gonçalves',
        errormessage: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})