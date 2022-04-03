const { Router } = require('express');
const controladorPersonas = require('../controladores/controladorPersonas');
const { body, query } = require('express-validator');
const router = Router();

router.get('/', controladorPersonas.inicio);
router.get('/listar', controladorPersonas.listarPersonas);
router.post('/guardar', body('identidad').isLength({min:13}).withMessage('Debe enviar un valor mayor a 13 digitos'), 
body('nombre').isLength({min:3}).withMessage('El nombre de la persona debe tener mas de 3 caracteres'),
body('apellido').isLength({min:3}).withMessage('El apellido de la persona debe tener mas de 3 caracteres'),
body('edad').isInt().withMessage('Debe enviar una edad correcta con números enteros'),
controladorPersonas.guardar);
router.put('/modificar', body('identidad').isLength({min:13}).withMessage('Debe enviar un valor mayor a 13 digitos'), 
body('nombre').isLength({min:3}).withMessage('El nombre de la persona debe tener mas de 3 caracteres'),
body('apellido').isLength({min:3}).withMessage('El apellido de la persona debe tener mas de 3 caracteres'),
body('edad').isInt().withMessage('Debe enviar una edad correcta con números enteros'), controladorPersonas.modificar);
router.delete('/eliminar', controladorPersonas.eliminar);

router.put('/modificarEliminar',controladorPersonas.modificarEliminar);

module.exports = router;