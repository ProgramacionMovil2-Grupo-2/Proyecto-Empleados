const ModeloProducto = require('../modelos/modeloProductos');
const ModeloTipo = require('../modelos/modeloTipos');
const { validationResult } = require('express-validator');
exports.inicio = (req, res) => {

    res.send("Esto es el inicio de el modulo de productos");
};

exports.listar = async (req, res) => {

    const lista = await ModeloProducto.findAll();
    if (lista.length == 0) {
        res.send("No existen datos");
    }
    else {
        res.json(lista);
    }


};
exports.buscarProducto = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { filtro } = req.query;

        const lista = await ModeloProducto.findAll({
            where: {
                nombre: filtro
            }
        });
        if (lista.length == 0) {
            res.send("No existen datos");
        }
        else {
            res.json(lista);
        }
    }
};
exports.guardarProducto = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const { idtipo, nombre, fechavencimiento, codigobarras, impuesto, precio } = req.body;
        if (!idtipo || !nombre || !fechavencimiento || !codigobarras || !impuesto || !precio) {
            res.send("Debe enviar los datos completos");
        }
        else {
            const buscarProducto = await ModeloTipo.findOne({
                where: {
                    id: idtipo,
                }
            })
            if (!buscarProducto) {
                res.send("El id del tipo no existe o esta inactivo");
            } else {
                await ModeloProducto.create({
                    idtipo: idtipo,
                    nombre: nombre,
                    fechavencimiento: fechavencimiento,
                    codigobarras: codigobarras,
                    impuesto: impuesto,
                    precio: precio,
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
exports.modificarProducto = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        console.log(req.query);
        console.log(req.body);

        const { id } = req.query;
        const { nombre, fechavencimiento, codigobarras, descripcion, impuesto, precio, idtipo } = req.body;
        if (!id || !nombre || !fechavencimiento || !codigobarras || !impuesto || !idtipo || !precio) {
            res.send("Debe enviar los datos completos");
        }
        else {

            var buscarProducto = await ModeloProducto.findOne({
                where: {
                    id: id,
                    estado: true
                }
            })

            if (!buscarProducto) {
                res.send("El id no existe o esta inactivo");
            }
            else {
                buscarProducto.nombre = nombre;
                buscarProducto.fechavencimiento = fechavencimiento;
                buscarProducto.codigobarras = codigobarras;
                buscarProducto.descripcion = descripcion;
                buscarProducto.impuesto = impuesto;
                buscarProducto.precio = precio;
                buscarProducto.idtipo = idtipo;
                await buscarProducto.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro actualizado");
                    })

                    .catch((error) => {
                        console.log(error);
                        res.send("Error al actualizar los datos o el id de tipo no existe");
                    })
            }
        }
    }
};

exports.modificarEliminar = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        console.log(req.query);
        console.log(req.body);

        const { id } = req.query;
        const {  estado  } = req.body;
        if (!id) {
            res.send("Debe enviar los datos completos");
        }
        else {

            var buscarProducto = await ModeloProducto.findOne({
                where: {
                    id: id,
                    estado: true
                }
            })

            if (!buscarProducto) {
                res.send("El id no existe o esta inactivo");
            }
            else {
                buscarProducto.estado = false;
                await buscarProducto.save()
                    .then((data) => {
                        console.log(data);
                        res.send("Registro Eliminado");
                    })

                    .catch((error) => {
                        console.log(error);
                        res.send("Error al eliminar los datos o el id de tipo no existe");
                    })
            }
        }
    }
};

exports.eliminarProducto = async (req, res) => {
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
            await ModeloProducto.destroy({
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

exports.guardar = async(req, res) => {
    console.log(req.body);

    const { idtipo, nombre, fechavencimiento, codigobarras, impuesto, precio } = req.body;
    if (!idtipo || !nombre || !fechavencimiento || !codigobarras || !impuesto || !precio || !req.files) {
        res.send("Debe enviar los datos obligatorios");
    } else {
        
    try {
        const producto = await ModeloProducto.create({
       
            ...req.body,
            imagen: req.files[0].filename,
          
        
         
        });
    
        res.json({ producto });
      } catch (error) {
        res.json({ error: error.message });
      }
    
       }
}; 