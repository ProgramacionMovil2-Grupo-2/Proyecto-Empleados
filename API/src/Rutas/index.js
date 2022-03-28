const {Router} = require('express');
const controladorPersonas = require('../controladores/controladorPersonas');
const router = Router();

router.get('/', controladorPersonas.inicio);

module.exports = router;