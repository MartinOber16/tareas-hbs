const { urlApi } = require('../config/vars');

// Cuenta de usuario
const userAccount = (req, res) => { 
    res.render( 'account', { urlApi } ); 
}

module.exports = {
    userAccount,
}
