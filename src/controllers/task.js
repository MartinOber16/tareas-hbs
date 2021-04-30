const axios = require('axios');
const { urlApi } = require('../config/vars');

// Obtener todas las tareas
const getTasks = async (req, res) => {

    try {
        const { offset = 0, limit = 10 } = req.query;
        const url = `${urlApi}/task?offset=${offset}&limit=${limit}`;
        
        const response = await axios.get( url, { headers: { token } } );
        const { data } = response;
        const { total, tasks } = data;

        res.render('task/tasks',{ 
            total,
            tasks,
            offset,
            limit,
        });
        
    } catch ( error ) {

        const { status, data } = error.response;
        const { message } = data.error;
        const errorInfo = {
            title: 'Error al obtener tareas',
            status,
            message,
        };

        console.error(errorInfo);
        errors.push( errorInfo );

        res.redirect('/');

    }

}

// TODO: Obtener tarea por ID

// TODO: Nueva tarea

// TODO: Actualizar tarea

// TODO: Borrar tarea

// TODO: Buscar tarea por termino


module.exports = {
    getTasks,
}