const { urlApi } = require('../config/vars');

// Obtener todos los usuarios
const getUsers = (req, res) => {
    res.render( 'user/users', { urlApi } );
}

// Obtener usuario por ID
const getUserById = (req, res) => {
    const idUser = req.query.id || req.params.id || 0;
    res.render( 'user/user', { 
        urlApi,
        idUser,
    } );
}

// Nuevo usuario
const newUser = (req, res) => {
    res.render( 'user/new', { urlApi } );
}


module.exports = {
    getUsers,
    getUserById,
    newUser,
}


