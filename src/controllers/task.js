const axios = require('axios');
const { urlApi } = require('../config/vars');

// Obtener todas las tareas
const getTasks = async (req, res) => {

    try {
        const url = `${urlApi}/task`;
        
        const response = await axios.get( url, { headers: { token } } );
        const { data } = response;
        const { total, tasks } = data;

        res.render('task/tasks',{ 
            total,
            tasks
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


module.exports = {
    getTasks,
}