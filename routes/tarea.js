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

app.get('/tareas', (req, res) => {
    res.render('tarea/tareas', {
      api_server: process.env.API_SERVER
    })
});

app.get('/nuevaTarea', (req, res) => {
    res.render('tarea/nuevaTarea', {
      api_server: process.env.API_SERVER
    })
});

app.get('/editarTarea', (req, res) => {
    let id = req.query.id || 0;

    res.render('tarea/editarTarea',{
      api_server: process.env.API_SERVER,
      idTarea: id
    });
});

module.exports = app;