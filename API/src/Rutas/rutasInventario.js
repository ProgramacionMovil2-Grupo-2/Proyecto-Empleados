const { Router } = require('express');
const {body, query} = require('express-validator');
const controladorinventario= require('../Controladores/controladorInventario');
const router = Router();
router.get('/',controladorinventario.inicio);
router.get('/listar',controladorinventario.listarInventario);
router.get('/buscar',query('id').isInt().withMessage('El Id debe ser un numero entero'),controladorinventario.buscarInventario);
router.post('/guardar',body('idProducto').isInt().withMessage('El IdProducto debe ser un numero entero'),
body('idCompras').isInt().withMessage('El IdCompras debe ser un numero entero'),
body('idVentas').isInt().withMessage('El IdVentas debe ser un numero entero'),
body('stock').isInt().withMessage('El stock debe ser un numero entero'),controladorinventario.guardarInventario);
router.put('/modificarStock',query('id').isInt().withMessage('El Id debe ser un numero entero'),body('stock').isInt().withMessage('El stock debe ser un numero entero'),controladorinventario.modificarStock);
router.delete('/eliminar',query('id').isInt().withMessage('El Id debe ser un numero entero'),controladorinventario.eliminarInventario);




module.exports=router;