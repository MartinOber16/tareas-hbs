const hbs = require('hbs');
const { urlApi } = require('../config/vars');

// helpers
hbs.registerHelper('getAnio', () => {
    return new Date().getFullYear();
});
