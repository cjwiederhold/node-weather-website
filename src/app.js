const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Set paths for express config
const pubDirPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Configure handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(pubDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'John Coney'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Thomas Sterwood'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Eric Bartol',
        help: 'You done messed up.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) return res.send({error: 'Must provide address'});
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) return res.send({error});
        forecast(latitude, longitude, (error, data) => {
            if (error) return res.send({error});
            res.send({
                location: location,
                forecast: data,
                address: req.query.address
            });
        });
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({error: 'Must provide search term.'})
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
});

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404: Page not found.',
        name: 'Nellie Caster',
        error: 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404: Page not found.',
        name: 'Melissa Haggerty',
        error: 'Page not found. Use one of the above links to leave this page.'
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000.');
});