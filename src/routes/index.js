const {Router} = require('express');
const router = Router();

router.use(require('./views.routes'));
router.use(require('./usuario.routes'));
router.use(require('./tarea.routes'));

module.exports = router;