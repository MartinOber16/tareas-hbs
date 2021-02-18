const express = require('express');
const app = express();

// Vistas
app.use(require('./views'));

module.exports = app;