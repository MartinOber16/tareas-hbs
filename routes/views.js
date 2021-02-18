require('../config/config');
const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');

// Helpers
require('../utils/helpers'); 

// Express HBS engine
hbs.registerPartials( path.resolve( __dirname, '../views/parciales') );
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('index', {
    api_server: process.env.API_SERVER
  })
});

app.get('/index', (req, res) => {
  res.render('index', {
    api_server: process.env.API_SERVER
  })
});

app.get('/contacto', (req, res) => {
  res.render('contacto');
});

module.exports = app;