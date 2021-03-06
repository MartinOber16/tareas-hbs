const express = require('express');

const path = require('path');
const hbs = require('hbs');
const { tareas, nuevaTarea, editarTarea } = require('../controllers/tareaController');

const app = express();

// Helpers
require('../utils/helpers'); 

// Express HBS engine
hbs.registerPartials( path.resolve( __dirname, '../views/parciales') );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));  

app.get('/tareas', tareas);

app.get('/nuevaTarea', nuevaTarea);

app.get('/editarTarea', editarTarea);

module.exports = app;