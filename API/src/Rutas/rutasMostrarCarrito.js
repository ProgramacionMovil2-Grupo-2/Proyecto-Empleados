const { Router } = require('express');
const controladorcarrito= require('../Controladores/controladormostrarCarrito');
const router = Router();
router.get('/',controladorcarrito.inicio);
router.get('/listar',controladorcarrito.listarDetalleV);
router.get('/buscar',controladorcarrito.buscarDetalleV);
module.exports=router;