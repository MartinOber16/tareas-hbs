const { urlApi } = require('../config/vars');

// Obtener todas las tareas
const getTasks = (req, res) => {
    res.render( 'task/tasks', { urlApi } );
}

// TODO: Obtener tarea por ID

// TODO: Nueva tarea

// TODO: Actualizar tarea

// TODO: Borrar tarea

// TODO: Buscar tarea por termino


module.exports = {
    getTasks,
}