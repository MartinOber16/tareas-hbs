const { port } = require('./config/vars');
const express = require('express');
const app = express();

// MIDDLEWARES
app.use(require('./middlewares/index'));

// ROUTES
app.use(require('./routes/index'));

 // SERVER
app.listen(port, () => {
    console.log('Escuchando el puerto: ', port);
});