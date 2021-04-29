const { urlApi } = require('./config/vars');
const express = require('express');
const hbs = require('hbs');
const { port } = require('./config/vars');
require('./utils/helpers');
const path = require('path');
const axios = require('axios');

const app = express();

// Middlewares
app.use( express.json());
app.use( express.urlencoded({ extended: false }) );
app.use( express.static( __dirname + '/public'));

// Express HBS engine
hbs.registerPartials( path.resolve( __dirname, '../src/views/partials') );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));  

// Rutas
app.get('/', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    // TODO: Validar usuario y guardar token en localStorage
    axios.post(`${urlApi}/auth/login`, {
        email, 
        password
        })
        .then(function (response) {
            console.log(response.status);
            console.log(response.data);
            //const { user, token } = response.data;

            res.redirect('/home');
        })
        .catch(function (error) {
            console.log(error.response.status);
            console.log(error.response.data.error.message);

            res.redirect('/');
        });

});

app.get('/home', (req, res) => {
    // TODO: levantar el token de localStorage y hacer la solicitud de las tareas del usuario
    res.render('home',{ 'data':1234 });    
});

app.get('/about', (req, res) => {
    res.render('about');    
});

app.get('*', (req, res) => {
     res.send('404 | Page not found');
 });

// SERVER
app.listen(port, () => {
    console.log('Escuchando el puerto: ', port);
});