const { urlApi } = require('../config/vars')

const tareas = (req, res) => {
    res.render('tarea/tareas', {
      api_server: urlApi
    })
};

const nuevaTarea = (req, res) => {
    res.render('tarea/nuevaTarea', {
      api_server: urlApi
    })
};

const editarTarea = (req, res) => {
    let id = req.query.id || 0;

    res.render('tarea/editarTarea',{
      api_server: urlApi,
      idTarea: id
    });
};


module.exports = {
    tareas,
    nuevaTarea,
    editarTarea
}