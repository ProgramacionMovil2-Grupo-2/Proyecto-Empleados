const { bus } = require('nodemon/lib/utils');
const ModeloProveedores = require('../modelos/modeloProveedores');
exports.inicio = (req, res) => {

    res.send("Esto es el inicio de el modulo de proveedores");
};

exports.listarProveedores = async (req, res) => {

    const lista = await ModeloProveedores.findAll();
    if (lista.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(lista);
    }
};

exports.guardarProveedores = async (req, res) => {

    const { descripcion } = req.body;
    if (!descripcion) {
        res.send("Debe enviar los datos completos");
    }
    else {
        await ModeloProveedores.create({
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
};

exports.modificarProveedores = async (req, res) => {
    console.log(req.query);
    console.log(req.body);

    const { id } = req.query;
    const { descripcion, telefono, direccion } = req.body;
    if (!id || !descripcion) {
        res.send("Debe enviar los datos completos");
    }
    else {
        var buscarProveedores = await ModeloProveedores.findOne({
            where: {
                id: id,
            }
        })
        if (!buscarProveedores) {
            res.send("El id no existe");
        }
        else {
            buscarProveedores.descripcion = descripcion;
            buscarProveedores.telefono = telefono;
            buscarProveedores.direccion = direccion;

            await buscarProveedores.save()
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

}; exports.eliminarProveedores = async (req, res) => {
    const { id } = req.query;
    if (!id) {
        res.send("Envie el id del registro");
    }
    else {
        await ModeloProveedores.destroy({
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
};