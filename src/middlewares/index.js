const express = require('express');
const compression = require('compression')
const path = require('path');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Compress all HTTP responses
app.use(compression());

// Habilitar la carpeta public
app.use( express.static( path.resolve(__dirname, '../public'), 
  { maxAge: '1d' } // Add Expires headers
  ));

module.exports = app;