const ModeloDetallecarrito = require('../Modelos/modelomostrarCarrito');

const {
    validationResult
} = require('express-validator');
exports.inicio = (req, res) => {
    res.send('Esto es el inicio del modulo Detalle Carrito de Compras');
};

exports.listarDetalleV = async (req, res) => {

    const listardetalleventa = await ModeloDetallecarrito.findAll();
    if (listardetalleventa.length == 0) {
        res.send("No existen datos");
    } else {
        res.json(listardetalleventa);
    }
};

exports.buscarDetalleV = async (req, res) => {
   
        const{idCarrito}= req.query;
       
            var buscarDetalleVenta = await ModeloDetallecarrito.findAll({
                where: {
                    idCarrito: idCarrito,
                }
            })
            if (!buscarDetalleVenta) {
                res.send("Este detalle carrito no existe");
            } else {
                res.json(buscarDetalleVenta);
            }
        
        
};