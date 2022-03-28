const { Router } = require('express');
const controladorEntrega = require('../Controladores/controladorEntrega');
const { body, query } = require('express-validator');
const router = Router();
router.get('/listar', controladorEntrega.listar);
router.get('/buscarEntrega', controladorEntrega.buscarEntrega);
router.post('/guardar', 
body('idpedido').isInt().withMessage('Debe enviar un valor entero'),
body('fecha').isDate().withMessage('Debe enviar una fecha correcta para este campo'),
body('idsucursal').isInt().withMessage('Debe enviar un valor entero'),
controladorEntrega.guardar);
router.put('/modificar',
body('idpedido').isInt().withMessage('Debe enviar un valor entero'),
body('estado').isInt().withMessage('Debe enviar un valor entero'),
body('idsucursal').isInt().withMessage('Debe enviar un valor entero'),
controladorEntrega.modificar);
router.put('/modificarIDPedido', 
body('idpedido').isInt().withMessage('Debe enviar un valor entero'),
controladorEntrega.modificarIDPedido);
router.put('/modificarEstado', 
body('estado').isInt().withMessage('Debe enviar un valor entero'),
controladorEntrega.modificarEstado);
router.put('/modificarIDSucursal', 
body('idsucursal').isInt().withMessage('Debe enviar un valor entero'),
controladorEntrega.modificarIDSucursal);
router.delete('/eliminar', controladorEntrega.eliminar);
module.exports=router;