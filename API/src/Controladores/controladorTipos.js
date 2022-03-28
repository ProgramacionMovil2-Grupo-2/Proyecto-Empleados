const { bus } = require('nodemon/lib/utils');
const ModeloTipo = require('../modelos/modeloTipos');
const { validationResult } = require('express-validator');
exports.inicio = (req, res) => {

    res.send("Esto es el inicio de el modulo de tipos");
};

exports.listarTipos = async (req, res) => {

    const lista = await ModeloTipo.findAll();
    if (lista.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(lista);
    }


};

exports.guardarTipos = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { descripcion } = req.body;
        if (!descripcion) {
            res.send("Debe enviar los datos completos");
        }
        else {
            await ModeloTipo.create({
                descripcion: descripcion,
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

};

exports.modificarTipos = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        console.log(req.query);

        console.log(req.body);

        const { id } = req.query;
        const { descripcion } = req.body;
        if (!id || !descripcion) {
            res.send("Debe enviar los datos completos");

        }
        else {

            var buscarTipos = await ModeloTipo.findOne({
                where: {
                    id: id,
                }
            })

            if (!buscarTipos) {
                res.send("El id no existe");
            }
            else {
                buscarTipos.descripcion = descripcion;



                await buscarTipos.save()
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

exports.eliminarTipos = async (req, res) => {
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

            await ModeloTipo.destroy({
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