const { Router } = require('express');
const { userAccount } = require('../controllers/account');

const router = Router();

// Cuenta de usuario
router.get('/account', userAccount );


module.exports = router;