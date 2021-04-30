const {Router} = require('express');
const { getLogin, postLogin } = require('../controllers/auth');

const router = Router();

// Mostrar formulario de login o validar token
router.get('/', getLogin);

// Login
router.post('/login', postLogin);


module.exports = router;