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

app.get('/usuarioGoogle', (req, res) => {
    res.render('usuario/usuarioGoogle', {
      api_server: process.env.API_SERVER
    })
});

app.get('/infoUsuario', (req, res) => {
res.render('usuario/infoUsuario', {
    api_server: process.env.API_SERVER
    })
});

app.get('/registroUsuario', (req, res) => {
    res.render('usuario/registroUsuario', {
      api_server: process.env.API_SERVER
    });
});

module.exports = app;