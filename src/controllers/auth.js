const { urlApi } = require('../config/vars');

// Login de usuario
const getLogin = (req, res) => { 
    res.render( 'login', { urlApi } ); 
}

// TODO: Login con cuenta de Google

// Registro de nuevo usuario
const registerUser = (req, res) => {
    res.render( 'register', { urlApi } ); 
}

module.exports = {
    getLogin,
    registerUser,
}
