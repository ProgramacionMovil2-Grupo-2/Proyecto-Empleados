const ModeloVentas = require('../Modelos/modeloVentas');
const ModeloPersonas = require('../Modelos/modeloPersonas');
const { validationResult } = require('express-validator');
exports.inicio = (req, res) => {
    res.send('Esto es el inicio del modulo Carrito de Compras');
};

exports.listarVentas = async (req, res) => {

    const listarventa = await ModeloVentas.findAll();
    if (listarventa.length == 0) {
        res.send("No existen datos");
    } else {
        res.json(listarventa);
    }
};

exports.buscarVentas = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const{id}= req.query;
        if (!id) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarVenta = await ModeloVentas.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarVenta) {
                res.send("Este carrito no existe");
            } else {
                res.json(buscarVenta);
            }
        }
    }
};
exports.guardarVentas = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const { idClientes} = req.body;
        if (!idClientes) {
            res.send("Debe enviar los datos completos");
        }
        else {
            var buscarClientes = await ModeloPersonas.findOne({
                where: {
                    id: idClientes,
                }
            })
            if (!buscarClientes) {
                res.send("El idClientes no existe");
            }else{
                await ModeloVentas.create({
                    idClientes: idClientes,
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

exports.modificarcliente = async (req, res) => {
    console.log(req.query);
    console.log(req.body);

    const { idClientes } = req.body;
    const { id } = req.query;
    

    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        if (!id || !idClientes) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarVenta = await ModeloVentas.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarVenta) {
                res.send("El id no existe");
            }
            else {
               buscarVenta.idClientes = idClientes;
                await buscarVenta.save()
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

exports.eliminarVentas = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { id } = req.query;
        if (!id) {
            res.send("Envie el id del registro");
        }
        else {
            await ModeloVentas.destroy({
                where:
                {
                    id: id,
                }
            })
                .then((data) => {
                    console.log(data);
                    if (data == 0) {
                        res.send("El id no existe");
                    }
                    else {
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