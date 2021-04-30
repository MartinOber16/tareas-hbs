const {Router} = require('express');
const { getTasks } = require('../controllers/task');

const router = Router();

// Obtener todas las tareas
router.get('/task', getTasks);

module.exports = router;