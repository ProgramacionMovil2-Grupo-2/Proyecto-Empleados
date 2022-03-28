const { Router } = require('express');
const {body, query} = require('express-validator');
const controladorDetalleVentas= require('../Controladores/controladorDetalleventas');
const router = Router();
router.get('/',controladorDetalleVentas.inicio);
router.get('/listar',controladorDetalleVentas.listarDetalleV);
router.get('/buscar',query('id').isInt().withMessage('El Id debe ser un numero entero'),controladorDetalleVentas.buscarDetalleV);
router.post('/guardar',body('idCarrito').isInt().withMessage('El Idcarrito debe ser un numero entero'),
body('idProducto').isInt().withMessage('El IdProducto debe ser un numero entero'),
body('cantidad').isInt().withMessage('La cantidad debe ser un numero entero'),
body('descuento').isDecimal().withMessage('El descuento debe ser un numero decimal'),controladorDetalleVentas.guardarDetalleV);

router.put('/modificarcantidad',query('id').isInt().withMessage('El Id debe ser un numero entero'),body('cantidad').isInt().withMessage('La cantidad debe ser un numero entero'),controladorDetalleVentas.modificarcantidad);
router.put('/modificardescuento',query('id').isInt().withMessage('El Id debe ser un numero entero'),body('descuento').isDecimal().withMessage('El descuento debe ser un numero decimal'),controladorDetalleVentas.modificardescuento);
router.put('/modificarproducto',query('id').isInt().withMessage('El Id debe ser un numero entero'),body('idProducto').isInt().withMessage('El producto debe ser un numero entero'),controladorDetalleVentas.modificarproducto);

router.delete('/eliminar',query('id').isInt().withMessage('El Id debe ser un numero entero'),controladorDetalleVentas.eliminarDetalleVentas);
module.exports=router;