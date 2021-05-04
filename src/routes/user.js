const { Router } = require('express');
const { getUsers, getUserById, newUser } = require('../controllers/user');

const router = Router();

// Obtener todos los usuarios
router.get('/users', getUsers);

// Obtener usuario por ID
router.get('/editUser', getUserById);

// Nuevo usuario
router.get('/newUser', newUser);

// TODO: Reestablecer contraseña de usuario


module.exports = router;