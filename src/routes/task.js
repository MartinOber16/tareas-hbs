const { Router } = require('express');
const { getTasks, getTaskById, newTask } = require('../controllers/task');

const router = Router();

// Obtener todas las tareas
router.get('/', getTasks);
router.get('/tasks', getTasks);

// Obtener tarea por ID
router.get('/editTask', getTaskById);

// Nueva tarea
router.get('/newTask', newTask);


module.exports = router;