const ModeloEntrega = require('../Modelos/modeloEntregas');
const ModeloPedidos = require('../Modelos/modelosPedidos');
const ModeloSucursal = require('../Modelos/modeloSucursal');
const { validationResult } = require('express-validator');

exports.listar = async (req, res) => {
    const lista = await ModeloEntrega.findAll();
    if (lista.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(lista);
    }
};


exports.buscarEntrega = async (req, res) => {
    const { id } = req.query;
    const lista = await ModeloEntrega.findAll({
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
        const { idpedido, fecha, idsucursal } = req.body;
        if (!idpedido || !fecha || !idsucursal) {
            res.send("Debe enviar los datos completos");
        }
        else {
            const buscarPedido = ModeloPedidos.findOne({
                where: {
                    id: idpedido,
                }
            });
            if (!buscarPedido) {
                res.send("El id del pedido no existe ");
            }
            const buscarSucursal = ModeloSucursal.findOne({
                where: {
                    id: idsucursal,
                }
            });
            if (!buscarSucursal) {
                res.send("El id de la sucursal no existe ");
            }
            else {
                await ModeloEntrega.create({
                    idpedido: idpedido,
                    fecha: fecha,
                    idsucursal: idsucursal
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



exports.modificar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { id } = req.query;
        const { idpedido, estado, idsucursal } = req.body;
        if (!id || !idpedido || !estado || !idsucursal) {
            res.send("Envie los datos completos");
        }
        else {
            var buscar = await ModeloEntrega.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscar) {
                res.send("El id no existe");
            }
            else {
                buscar.idpedido = idpedido;
                buscar.estado = estado;
                buscar.idsucursal = idsucursal;
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


exports.modificarIDPedido = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { id } = req.query;
        const { idpedido } = req.body;
        if (!id || !idpedido) {
            res.send("Envie los datos completos");
        }
        else {
            var buscar = await ModeloEntrega.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscar) {
                res.send("El id no existe");
            }
            else {
                buscar.idpedido = idpedido;
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


exports.modificarEstado = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { id } = req.query;
        const { estado } = req.body;
        if (!id || !estado) {
            res.send("Envie los datos completos");
        }
        else {
            var buscar = await ModeloEntrega.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscar) {
                res.send("El id no existe");
            }
            else {
                buscar.estado = estado;
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


exports.modificarIDSucursal = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { id } = req.query;
        const { idsucursal } = req.body;
        if (!id || !idsucursal) {
            res.send("Envie los datos completos");
        }
        else {
            var buscar = await ModeloEntrega.findOne({
                where: {
                    id: id,
                }
            });
            if (!buscar) {
                res.send("El id no existe");
            }
            else {
                buscar.idsucursal = idsucursal;
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
        var buscar = await ModeloEntrega.findOne({
            where: {
                id: id,
            }
        });
        if (!buscar) {
            res.send("El id no existe");
        }
        else {
            await ModeloEntrega.destroy({
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
