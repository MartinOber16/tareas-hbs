const { Router } = require('express');
const { getLogin, registerUser, googleLogin } = require('../controllers/auth');

const router = Router();

// Login de usuario
router.get('/login', getLogin);

// Login con cuenta de Google
router.get('/google', googleLogin);

// Registro de nuevo usuario
router.get('/register', registerUser);


module.exports = router;