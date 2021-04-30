const { urlApi } = require('../config/vars');

// Obtener todas las tareas
const getTasks = (req, res) => {
    res.render( 'task/tasks', { urlApi } );
}

// Obtener tarea por ID
const getTaskById = (req, res) => {
    const idTask = req.query.id || req.params.id || 0;
    res.render( 'task/task', { 
        urlApi,
        idTask,
    } );
}

// Nueva tarea
const newTask = (req, res) => {
    res.render( 'task/new', { urlApi } );
}

module.exports = {
    getTasks,
    getTaskById,
    newTask,
}