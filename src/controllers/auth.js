const { urlApi } = require('../config/vars');

// Login
const getLogin = (req, res) => { 
    res.render( 'login', { urlApi } ); 
}

// TODO: Login con cuenta de Google

// TODO: Registro

// TODO: Logout


module.exports = {
    getLogin,
}
