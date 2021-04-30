const axios = require('axios');
const { urlApi } = require('../config/vars');

// Mostrar formulario de login o validar token
const getLogin = async (req, res) => {

    if(token !== '') {
        // TODO: Renovar token
        res.redirect('/task');
    } else {
        res.render('login', { errors });
    }

}

// Login
const postLogin = async (req, res) => {

    try {
        const url = `${urlApi}/auth/login`;
        const { email, password } = req.body;
        
        const response = await axios.post( url, { email, password } );
        const { data } = response;

        // TODO: ESTO ESTA MAL!
        token = data.token;
        user = data.user;
        errors = []; // Limpio el array de errores

        res.redirect( '/task' );
        
    } catch ( error ) {

        const { status, data } = error.response;
        const { message } = data.error;
        const errorInfo = {
            title: 'Error en login',
            status,
            message,
        };

        console.error(errorInfo);
        errors.push( errorInfo );

        res.redirect('/');

    }

}

// TODO: Login con cuenta de Google

// TODO: Registro

// TODO: Logout

// TODO: Cambio de contraseña

// TODO: Reestablecer contraseña


module.exports = {
    getLogin,
    postLogin,
}
