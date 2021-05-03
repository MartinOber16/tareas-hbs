const { urlApi } = require('../config/vars');
const { Router } = require('express');
const router = Router();


// Autenticación
router.use(require('./auth'));

// Tareas
router.use(require('./task'));

// Usuarios
//router.use(require('./user'));

// Cuenta de usuario
router.use(require('./account'));

// Contacto
router.get('/contact', (req, res) => {
    res.render( 'contact', { urlApi } ); 
});

// Si no encuentra la página
router.get('*', (req, res) => {
    res.send('404 | Page not found');
});

module.exports = router;