const express = require('express');
const path = require('path');
const hbs = require('hbs');
const { port } = require('./config/vars');
require('./utils/helpers');

const app = express();

// MIDDLEWARES
app.use(require('./middlewares/index'));
app.use( express.static( __dirname + '/public'));

// Express HBS engine
hbs.registerPartials( path.resolve( __dirname, '../src/views/partials') );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));  

// ROUTES
app.use(require('./routes/index'));

// SERVER
app.listen(port, () => {
    console.log('Escuchando el puerto: ', port);
});