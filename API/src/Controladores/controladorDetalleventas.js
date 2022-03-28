const ModeloDetalleVentas = require('../Modelos/modeloDetalleVentas');
const ModeloProductos = require('../Modelos/modeloProductos');
const ModeloCarrito = require('../Modelos/modeloVentas');
const {
    validationResult
} = require('express-validator');
exports.inicio = (req, res) => {
    res.send('Esto es el inicio del modulo Detalle Carrito de Compras');
};

exports.listarDetalleV = async (req, res) => {

    const listardetalleventa = await ModeloDetalleVentas.findAll();
    if (listardetalleventa.length == 0) {
        res.send("No existen datos");
    } else {
        res.json(listardetalleventa);
    }
};

exports.buscarDetalleV = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const{id}= req.query;
        if (!id) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarDetalleVenta = await ModeloDetalleVentas.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarDetalleVenta) {
                res.send("Este detalle carrito no existe");
            } else {
                res.json(buscarDetalleVenta);
            }
        }
    }
};

exports.guardarDetalleV = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const {
            idProducto,
            idCarrito,
            cantidad,
            descuento
        } = req.body;
        if (!idCarrito || !idProducto || !cantidad || !descuento) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarCarrito = await ModeloCarrito.findOne({
                where: {
                    id: idCarrito,
                }
            })
            var buscarProducto = await ModeloProductos.findOne({
                where: {
                    id: idProducto,
                }
            })
            if (!buscarCarrito) {
                res.send("El idCarrito no existe");
            } else if (!buscarProducto) {
                res.send("El idProducto no existe");
            } else {
                await ModeloDetalleVentas.create({
                        idCarrito: idCarrito,
                        idProducto: idProducto,
                        cantidad: cantidad,
                        descuento: descuento
                    })
                    .then((data) => {
                        console.log(data);
                        res.send("Registro Almacenado");
                    })
                    .catch((error) => {
                        console.log(error);
                        res.send("Error al guardar datos");
                    });

            }

        }
    }

};

exports.modificarcantidad = async (req, res) => {
    console.log(req.query);
    console.log(req.body);

    const {
        cantidad
    } = req.body;
    const {
        id
    } = req.query;


    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        if (!id || !cantidad) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarDetalleVenta = await ModeloDetalleVentas.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarDetalleVenta) {
                res.send("El id no existe");
            } else {
                buscarDetalleVenta.cantidad = cantidad;
                await buscarDetalleVenta.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro actualizado");
                    })

                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos");
                    })
            }
        }
    }
};

exports.modificardescuento = async (req, res) => {
    console.log(req.query);
    console.log(req.body);

    const {
        descuento
    } = req.body;
    const {
        id
    } = req.query;


    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        if (!id || !descuento) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarDetalleVenta = await ModeloDetalleVentas.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarDetalleVenta) {
                res.send("El id no existe");
            } else {
                buscarDetalleVenta.descuento = descuento;
                await buscarDetalleVenta.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro actualizado");
                    })

                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos");
                    })
            }
        }
    }
};

exports.modificarproducto = async (req, res) => {
    console.log(req.query);
    console.log(req.body);

    const {
        idProducto
    } = req.body;
    const {
        id
    } = req.query;


    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        if (!id || !idProducto) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarDetalleVenta = await ModeloDetalleVentas.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarDetalleVenta) {
                res.send("El id no existe");
            } else {
                buscarDetalleVenta.idProducto = idProducto;

                var buscarProducto = await ModeloProductos.findOne({
                    where: {
                        id: idProducto,
                    }
                })
                if (!buscarProducto) {
                    res.send("El idProducto no existe");
                } else {
                await buscarDetalleVenta.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro actualizado");
                    })

                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos");
                    })
                }
            }
        }
    }
};

exports.eliminarDetalleVentas = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const {
            id
        } = req.query;
        if (!id) {
            res.send("Envie el id del registro");
        } else {
            await ModeloDetalleVentas.destroy({
                    where: {
                        id: id,
                    }
                })
                .then((data) => {
                    console.log(data);
                    if (data == 0) {
                        res.send("El id no existe");
                    } else {
                        res.send("Registro eliminado");
                    }

                })
                .catch((error) => {
                    console.log(error);
                    res.send("Error al aliminar los datos");
                })
        }
    }
};