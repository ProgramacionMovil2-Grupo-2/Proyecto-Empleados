const { Router } = require('express');
const controladorPedidos = require('../Controladores/controladorPedidos');
const { body, query } = require('express-validator');
const router = Router();
router.get('/listar', controladorPedidos.listar);
router.get('/buscarPedido', controladorPedidos.buscarPedido);
router.post('/guardar',
body('idventa').isInt().withMessage("Solo se aceptan numeros enteros"), 
body('fechaPedido').isDate().withMessage("Debe colocar una fecha valida"), 
controladorPedidos.guardar);
router.put('/modificarIDVenta',
body('idventa').isInt().withMessage("Debe colocar un número entero"),
controladorPedidos.modificarIDVenta);
router.delete('/eliminar', controladorPedidos.eliminar);
module.exports=router;