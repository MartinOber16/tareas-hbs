const {Router} = require('express');
const router = Router();

// Autenticación
router.use(require('./auth'));

// Tareas
router.use(require('./task'));

// Si no encuentra la página
router.get('*', (req, res) => {
    res.send('404 | Page not found');
});

module.exports = router;