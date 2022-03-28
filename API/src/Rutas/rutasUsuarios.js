const { Router } = require('express');
const controladorUsuarios = require('../controladores/controladorUsuarios');
const { body, query } = require('express-validator');
const controladorAutenticacion = require('../controladores/controladorAuth');
const router = Router();

router.get('/listarUsuarios', controladorAutenticacion.ValidarAutenticado,controladorUsuarios.listarUsuarios);
router.get('/buscarUsuario', controladorAutenticacion.ValidarAutenticado, controladorUsuarios.buscarUsuario);
router.post('/guardarUsuario',
body('login').isLength({min:3}).withMessage('El nombre de usuario debe tener mas de 3 caracteres'),
body('correo').isEmail().withMessage('Debe enviar un correo valido'),
body('contrasena').isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres'),controladorUsuarios.guardarUsuario);
router.put('/modificarUsuario', body('id_personas').isInt().withMessage('Debe enviar valores enteros'),
body('login').isLength({min:3}).withMessage('El nombre de usuario debe tener mas de 3 caracteres'),
body('correo').isEmail().withMessage('Debe enviar un correo valido'),
body('contrasena').isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres'), controladorUsuarios.modificarUsuario);
router.delete('/eliminarUsuario', controladorUsuarios.eliminarUsuario);

module.exports = router;