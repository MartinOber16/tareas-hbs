const { Router } = require('express');
const { getLogin } = require('../controllers/auth');

const router = Router();

// Login
router.get('/', getLogin);

// TODO: Login con cuenta de Google

// TODO: Registro

// TODO: Logout


module.exports = router;