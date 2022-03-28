const { Router } = require('express');
const controladorSucursal = require('../Controladores/controladorSucursal');
const { body, query } = require('express-validator');
const router = Router();
router.get('/listar', controladorSucursal.listar);
router.get('/buscarCiudad', controladorSucursal.buscarCiudad);
router.post('/guardar',
body('ciudad').isLength({max:45}).withMessage('El campo ciudad sobrepasa lo permitido'),
body('direccion').isLength({max:250}).withMessage('El campo direccion sobrepasa lo permitido'), 
body('telefono').isLength({max:8}).withMessage('El número de digitos sobrepasa lo permitido').isLength({min:8}).withMessage('El número de digitos es menor a lo solicitado'),
controladorSucursal.guardar);
router.put('/modificar',
body('direccion').isLength({max:250}).withMessage('El campo direccion sobrepasa lo permitido'), 
body('telefono').isLength({max:8}).withMessage('El número de digitos sobrepasa lo permitido').isLength({min:8}).withMessage('El número de digitos es menor a lo solicitado'),
controladorSucursal.modificar);
router.put('/modificarDireccion',
body('direccion').isLength({max:250}).withMessage('El campo direccion sobrepasa lo permitido'),
controladorSucursal.modificarDireccion);
router.put('/modificarTelefono',
body('telefono').isLength({max:8}).withMessage('El número de digitos sobrepasa lo permitido').isLength({min:8}).withMessage('El número de digitos es menor a lo solicitado').isInt().withMessage('Debe enviar un valor numerico'),
controladorSucursal.modificarTelefono);
router.delete('/eliminar', controladorSucursal.eliminar);
module.exports=router;