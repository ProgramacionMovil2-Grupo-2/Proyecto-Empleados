const { Router } = require('express');
const controladorProveedores = require('../controladores/controladorProveedores');
const { body, query } = require('express-validator');
const router = Router();
router.get('/', controladorProveedores.inicio);
router.get('/listar', controladorProveedores.listarProveedores);
router.post('/guardar', 
body('id').isInt().withMessage('Debe enviar valores enteros para el id de la persona'),
body('descripcion').isLength({max:45}).withMessage('El nombre del proveedor debe tener 45 o menos caracteres'),
controladorProveedores.guardarProveedores );
router.put('/modificar', 
body('id').isInt().withMessage('Debe enviar valores enteros para el id de la persona'),
body('descripcion').isLength({max:45}).withMessage('El nombre del proveedor debe tener 45 o menos caracteres'),
body('telefono').isLength({max:9}).withMessage('El numero de telefono debe tener 9 o menos caracteres'), 
body('direccion').isLength({max:250}).withMessage('La direccion del proveedor debe tener 250 o menos caracteres'),  
controladorProveedores.modificarProveedores );
router.delete('/eliminar', 
body('id').isInt().withMessage('Debe enviar valores enteros para el id de la persona'),
controladorProveedores.eliminarProveedores);
module.exports=router;