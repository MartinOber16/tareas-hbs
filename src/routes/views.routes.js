const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { homePage, contacto } = require('../controllers/viewsController');

const app = express();

// Helpers
require('../utils/helpers'); 

// Express HBS engine
hbs.registerPartials( path.resolve( __dirname, '../views/parciales') );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));  

app.get('/', homePage);

app.get('/index', homePage);

app.get('/contacto', contacto );

module.exports = app;