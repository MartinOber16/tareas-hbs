const { Router } = require('express');
const { getLogin, registerUser } = require('../controllers/auth');

const router = Router();

// Login de usuario
router.get('/', getLogin);

// TODO: Login con cuenta de Google

// Registro de nuevo usuario
router.get('/register', registerUser);


module.exports = router;