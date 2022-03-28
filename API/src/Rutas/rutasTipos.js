const { Router } = require('express');
const controladorTipos = require('../controladores/controladorTipos');
const { body, query } = require('express-validator');
const router = Router();
router.get('/', controladorTipos.inicio);
router.get('/listar', controladorTipos.listarTipos);
router.post('/guardar', 
body('descripcion').isLength({max:45}).withMessage('El nombre del tipo debe tener 45 o menos caracteres'), 
controladorTipos.guardarTipos );
router.put('/modificar', 
body('descripcion').isLength({max:45}).withMessage('El nombre del tipo debe tener 45 o menos caracteres'), 
controladorTipos.modificarTipos );
router.delete('/eliminar', 
controladorTipos.eliminarTipos);
module.exports=router;