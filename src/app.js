const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'mETa'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'mETa'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'This is some helpful text',
        name: 'mETa'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: 'Error fetching geodata.'
                })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }


    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Help article not found.',
        name: 'mETa',
        title: 'Help'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found.',
        name: 'mETa',
        title: 'Help'
    })
})

app.listen(3000, () => {
    console.log('Server is up on Port 3000')
})

