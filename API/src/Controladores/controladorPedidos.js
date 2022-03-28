const ModeloPedidos = require('../Modelos/modelosPedidos');
const ModeloVentas = require('../Modelos/modeloVentas');
const { validationResult } = require('express-validator');

exports.listar = async (req, res) => {
    const lista = await ModeloPedidos.findAll();
    if (lista.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(lista);
    }
};


exports.buscarPedido = async (req, res) => {
    const { id } = req.query;
    const lista = await ModeloPedidos.findAll({
        where: {
            id: id
        }
    });
    if (lista.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(lista);
    }
};


exports.guardar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { idventa, fechaPedido } = req.body;
        if (!idventa || !fechaPedido) {
            res.send("Debe enviar los datos completos");
        }
        else {
            const buscarVenta = ModeloVentas.findOne({
                where: {
                    id: idventa,
                }
            });
            if (!buscarVenta) {
                res.send("El id de la venta no existe ");
            }
            else {
                await ModeloPedidos.create({
                    idventa: idventa,
                    fechaPedido: fechaPedido
                })
                    .then((data) => {
                        console.log(data);
                        res.send("Registro almacenado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al guardar los datos");
                    });
            }
        }
    }
};


exports.modificarIDVenta = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const { id } = req.query;
        const { idventa } = req.body;
        if (!id || !idventa) {
            res.send("Envie los datos completos");
        }
        else {
            var buscar = await ModeloPedidos.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscar) {
                res.send("El id no existe");
            }
            else {
                //modifica en memoria
                buscar.idventa = idventa;
                //modificar en la base de datos 
                await buscar.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro actualizado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos");
                    });
            }
        }
    }
};


exports.eliminar = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.send("Envie el id del registro");
    }
    else {
        var buscar = await ModeloPedidos.findOne({
            where: {
                id: id,
            }
        });
        if (!buscar) {
            res.send("El id no existe");
        }
        else {
            await ModeloPedidos.destroy({
                where: {
                    id: id,
                }
            })
                .then((data) => {
                    console.log(data);
                    res.send("Registro eliminado");
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al eliminar el registro");
                });
        }
    }
};
