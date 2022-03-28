const { Router } = require('express');
const controladorCompras = require('../Controladores/controladorCompras');
const { body, query } = require('express-validator');
const router = Router();
router.get('/',controladorCompras.Inicio);
router.get('/listarCompras',controladorCompras.listarCompras);
router.post('/guardarCompras',
body('idProveedor').isInt().withMessage('Debe tener 1 caracter'),
body('fecha').isDate().withMessage('Debe tener 8 o mas caractares'),
controladorCompras.guardarCompras);

router.put('/modificarCompras',
query('id').isInt().withMessage('Debe enviar valores enteros para el id'),
body('idProveedor').isInt().withMessage('Debe tener 1 caracter'),
body('fecha').isDate().withMessage('Debe tener 8 o mas caractares'),
controladorCompras.modificarCompras);

router.delete('/eliminarCompras',
query('id').isInt().withMessage('Debe enviar valores enteros para el id'),
controladorCompras.eliminar);
module.exports=router;