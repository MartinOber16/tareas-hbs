const { Router } = require('express');
const { getLogin } = require('../controllers/auth');

const router = Router();

// Login
router.get('/', getLogin);

// TODO: Login con cuenta de Google

// TODO: Registro

// TODO: Logout

// TODO: Cambio de contraseña

// TODO: Reestablecer contraseña


module.exports = router;