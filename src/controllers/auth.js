const { urlApi } = require('../config/vars');

// Login
const getLogin = (req, res) => { 
    res.render( 'login', { urlApi } ); 
}

// TODO: Login con cuenta de Google

// TODO: Registro

// TODO: Logout

// TODO: Cambio de contraseña

// TODO: Reestablecer contraseña


module.exports = {
    getLogin,
}
