const express = require('express');
const compression = require('compression')
const helmet = require('helmet');

const app = express();

//app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

app.use( compression() );

app.use( express.json());

app.use( express.urlencoded({ extended: false }) );


module.exports = app;
