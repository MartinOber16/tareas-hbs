const express = require('express');

const path = require('path');
const hbs = require('hbs');
const { users, newUser, editUser } = require('../controllers/userController');

const app = express();

// Helpers
require('../utils/helpers'); 

// Express HBS engine
hbs.registerPartials( path.resolve( __dirname, '../views/parciales') );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));  

app.get('/users', users);

app.get('/newUser', newUser);

app.get('/editUser', editUser);

module.exports = app;