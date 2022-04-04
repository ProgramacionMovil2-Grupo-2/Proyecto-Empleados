const ModeloverCompra = require('../Modelos/modeloverCompra');

const {
    validationResult
} = require('express-validator');
exports.inicio = (req, res) => {
    res.send('Esto es el inicio del modulo Compra');
};

exports.listarverCompra = async (req, res) => {

    const listarverCompraa = await ModeloverCompra.findAll();
    if (listarverCompraa.length == 0) {
        res.send("No existen datos");
    } else {
        res.json(listarverCompraa);
    }
};

exports.buscarverCompra = async (req, res) => {
   
        const{idCompra}= req.query;
       
            var buscarverCompra = await ModeloverCompra.findAll({
                where: {
                    idCompra: idCompra,
                }
            })
            if (!buscarverCompra) {
                res.send("Esta Compra no existe");
            } else {
                res.json(buscarverCompra);
            }
        
        
};