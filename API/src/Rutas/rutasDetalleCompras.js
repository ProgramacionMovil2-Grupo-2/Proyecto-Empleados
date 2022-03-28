const { Router } = require('express');
const controladorDetalleCompras = require('../Controladores/controladorDetalleCompras');
const { body, query } = require('express-validator');
const router = Router();
router.get('/',controladorDetalleCompras.Inicio);
router.get('/listarDetalleCompras',controladorDetalleCompras.listarDetalleCompras);
router.post('/guardarDetalleCompras',
body('idCompra').isInt().withMessage('Debe enviar valores enteros para el id'),
body('idProducto').isInt().withMessage('Debe enviar valores enteros para el id'),
body('precioCompra').isDecimal().withMessage('Debe tener 8 o mas caractares'),
body('cantidad').isInt().withMessage('Debe tener 8 o mas caractares'),
controladorDetalleCompras.guardarDetalleCompras);

router.put('/modificarDetalleCompras',
query('id').isInt().withMessage('Debe enviar valores enteros para el id'),
body('idCompra').isInt().withMessage('Debe enviar valores enteros para el id'),
body('idProducto').isInt().withMessage('Debe enviar valores enteros para el id'),
body('precioCompra').isDecimal().withMessage('Debe tener 8 o mas caractares'),
body('cantidad').isInt().withMessage('Debe tener 8 o mas caractares'),
controladorDetalleCompras.modificarDetalleCompras);

router.delete('/eliminarDetalleCompras',
query('id').isInt().withMessage('Debe enviar valores enteros para el id'),
controladorDetalleCompras.eliminarDetalleCompras);
module.exports=router;