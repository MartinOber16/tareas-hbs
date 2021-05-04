const { urlApi } = require('../config/vars');

// Login de usuario
const getLogin = (req, res) => { 
    res.render( 'auth/login', { urlApi } ); 
}

// Login con cuenta de Google
const googleLogin = (req, res) => {
    res.render( 'auth/google', { urlApi } ); 
}

// Registro de nuevo usuario
const registerUser = (req, res) => {
    res.render( 'auth/register', { urlApi } ); 
}

module.exports = {
    getLogin,
    registerUser,
    googleLogin,
}
