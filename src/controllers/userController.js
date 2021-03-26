const { urlApi } = require('../config/vars')

const users = (req, res) => {
    res.render('user/users', {
      api_server: urlApi
    })
};

const newUser = (req, res) => {
    res.render('user/newUser', {
      api_server: urlApi
    })
};

const editUser = (req, res) => {
    let id = req.query.id || 0;

    res.render('user/editUser',{
      api_server: urlApi,
      idUser: id
    });
};


module.exports = {
    users,
    newUser,
    editUser
}