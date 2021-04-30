const {Router} = require('express');
const { getTasks } = require('../controllers/task');

const router = Router();

// Obtener todas las tareas
router.get('/task', getTasks);

// TODO: Obtener tarea por ID

// TODO: Nueva tarea

// TODO: Actualizar tarea

// TODO: Borrar tarea

// TODO: Buscar tarea por termino


module.exports = router;