const { Router } = require('express');
const controladorProductos = require('../controladores/controladorProductos');
const { body, query } = require('express-validator');
const router = Router();
router.get('/', controladorProductos.inicio);
router.get('/listar', controladorProductos.listar);
router.get('/buscarProducto', 
query('filtro').isLength({min:6}).withMessage('Debe enviar un estado valido'),
controladorProductos.buscarProducto);
router.post('/guardarProducto', 
body('idtipo').isInt().withMessage('Debe enviar valores enteros para el id de la categoria'),
body('nombre').isLength({max:45}).withMessage('El nombre del producto debe tener 45 o menos caracteres'),
body('fechavencimiento').isDate().withMessage('Debe enviar una fecha '),
body('codigobarras').isLength({max:45}).withMessage('El codigo de barras del producto debe tener 45 o menos caracteres'),
controladorProductos.guardarProducto );
router.put('/modificarProducto', 
body('nombre').isLength({max:45}).withMessage('El nombre del producto debe tener 45 o menos caracteres'),
body('codigobarras').isLength({max:45}).withMessage('El codigo de barras del proveedor debe tener 45 o menos caracteres'),
body('imagen').isLength({max:250}).withMessage('La direccion de la imagen debe tener 250 o menos caracteres'),
controladorProductos.modificarProducto);
router.put('/modificarEliminar', 
controladorProductos.modificarEliminar);
router.delete('/eliminarProducto', 
controladorProductos.eliminarProducto);
module.exports=router;