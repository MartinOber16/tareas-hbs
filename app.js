require('./config/config');
const compression = require('compression')
const express = require('express');
const path = require('path'); // paquete nativo de Node

const app = express()
const bodyParser = require('body-parser');

// Compress all HTTP responses
app.use(compression());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json()); 

// Habilitar la carpeta public
app.use( express.static( path.resolve(__dirname, './public'), 
  { maxAge: '1d' } // Add Expires headers
  ));

// Configuración global de rutas
app.use(require('./routes/index'));

// Ruta por defecto
app.get('/', function (req, res) {
  //res.send('Hello World')
  res.json('Tareas - App web Node JS');
});
 
app.listen(process.env.PORT, () => {
    console.log('Escuchando el puerto: ', process.env.PORT);
});