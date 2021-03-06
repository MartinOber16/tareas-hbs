const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { usuarioGoogle, infoUsuario, registroUsuario } = require('../controllers/usuarioController');

const app = express();

// Helpers
require('../utils/helpers'); 

// Express HBS engine
hbs.registerPartials( path.resolve( __dirname, '../views/parciales') );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));  

app.get('/usuarioGoogle', usuarioGoogle);
app.get('/infoUsuario', infoUsuario);
app.get('/registroUsuario',registroUsuario );

module.exports = app;