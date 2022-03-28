const { Router } = require('express');
const {body, query} = require('express-validator');
const controladorVentas = require('../Controladores/controladorVentas');
const router = Router();
router.get('/',controladorVentas.inicio);
router.get('/listar',controladorVentas.listarVentas);
router.get('/buscar',query('id').isInt().withMessage('El Id debe ser un numero entero'),controladorVentas.buscarVentas);

router.post('/guardar',body('idClientes').isInt().withMessage('El id debe de ser un numero entero'),controladorVentas.guardarVentas);
router.put('/editar', query('id').isInt().withMessage('El id debe de ser un numero entero'),
body('idClientes').isInt().withMessage('El idClientes debe de ser un numero entero'),controladorVentas.modificarcliente);
router.delete('/eliminar', query('id').isInt().withMessage('El id debe de ser un numero entero'),controladorVentas.eliminarVentas);

module.exports=router;