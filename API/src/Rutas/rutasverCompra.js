const { Router } = require('express');
const controladorverCompra= require('../Controladores/controladorverCompra');
const router = Router();
router.get('/',controladorverCompra.inicio);
router.get('/listarverCompra',controladorverCompra.listarverCompra);
router.get('/buscarverCompra',controladorverCompra.buscarverCompra);
module.exports=router;