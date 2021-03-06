const { urlApi } = require('../config/vars')

const usuarioGoogle = (req, res) => {
    res.render('usuario/usuarioGoogle', {
      api_server: urlApi
    })
};

const infoUsuario = (req, res) => {
    res.render('usuario/infoUsuario', {
        api_server: urlApi
        })
    };

const registroUsuario = (req, res) => {
    res.render('usuario/registroUsuario', {
      api_server: urlApi
    });
};


module.exports = {
    usuarioGoogle,
    infoUsuario,
    registroUsuario
}