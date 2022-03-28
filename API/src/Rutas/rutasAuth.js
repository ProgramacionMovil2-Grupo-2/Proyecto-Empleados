const { Router } = require('express');
const controladorAuth = require('../controladores/controladorAuth');
const { body, query } = require('express-validator');
const router = Router();

router.post('/correo',body('correo').isEmail().withMessage('Debe enviar un correo valido'),
controladorAuth.recuperarContrasena);
router.post('/iniciosesion', body('usuario').isEmail().withMessage('Debe enviar un correo valido'),
body('contrasena').isLength({min: 6}).withMessage('La contraseña debe tener 6 o más caracteres'), controladorAuth.InicioSesion);
router.get('/error', controladorAuth.Error);

module.exports = router;