const { urlApi } = require('../config/vars')

const homePage = (req, res) => {
    res.render('index', {
      api_server: urlApi
    })
  };

const contacto = (req, res) => {
    res.render('contacto');
  };

module.exports = {
    homePage,
    contacto
}