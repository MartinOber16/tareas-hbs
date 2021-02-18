require('../config/config');
const express = require('express');
const app = express();
const path = require('path'); // paquete nativo de Node
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

app.get('/usuarioGoogle', (req, res) => {
    res.render('usuarioGoogle', {
      api_server: process.env.API_SERVER
    })
  });

app.get('/tareas', (req, res) => {
    res.render('tareas', {
      api_server: process.env.API_SERVER
    })
  });

app.get('/infoUsuario', (req, res) => {
    res.render('infoUsuario', {
      api_server: process.env.API_SERVER
    })
  });

app.get('/nuevaTarea', (req, res) => {
    res.render('nuevaTarea', {
      api_server: process.env.API_SERVER
    })
  });

app.get('/editarTarea', (req, res) => {
    let id = req.query.id || 0;

    res.render('editarTarea',{
      api_server: process.env.API_SERVER,
      idTarea: id
    });
  });

app.get('/contacto', (req, res) => {
  res.render('contacto');
});

app.get('/registroUsuario', (req, res) => {
  res.render('registroUsuario', {
    api_server: process.env.API_SERVER
  });
});

module.exports = app;