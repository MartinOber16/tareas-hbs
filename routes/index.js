const express = require('express');
const app = express();

app.use(require('./views'));
app.use(require('./usuario'));
app.use(require('./tarea'));

module.exports = app;