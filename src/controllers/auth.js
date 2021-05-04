const { urlApi } = require('../config/vars');

// Login de usuario
const getLogin = (req, res) => { 
    res.render( 'login', { urlApi } ); 
}

// Login con cuenta de Google
const googleLogin = (req, res) => {
    res.render( 'google', { urlApi } ); 
}

// Registro de nuevo usuario
const registerUser = (req, res) => {
    res.render( 'register', { urlApi } ); 
}

module.exports = {
    getLogin,
    registerUser,
    googleLogin,
}
