const ModeloInventario = require('../Modelos/modeloInventario');
const ModeloProductos = require('../Modelos/modeloProductos');
const ModeloCarrito = require('../Modelos/modeloVentas');

const {
    validationResult
} = require('express-validator');


exports.inicio = (req, res) => {
    res.send('Esto es el inicio del modulo Inventario');
};

exports.listarInventario = async (req, res) => {

    const listarinventario = await ModeloInventario.findAll();
    if (listarinventario.length == 0) {
        res.send("No existen datos");
    } else {
        res.json(listarinventario);
    }
};
exports.buscarInventario = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const{id}= req.query;
        if (!id) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarInventario = await ModeloInventario.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarInventario) {
                res.send("Este idInventario no existe");
            } else {
                res.json(buscarInventario);
            }
        }
    }
};
exports.guardarInventario = async (req, res) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        const { idProducto,idCompras, idVentas, stock} = req.body;
        if (!idProducto || !idCompras || !idVentas || !stock) {
            res.send("Debe enviar los datos completos");
        }
        else {
            var buscarProducto = await ModeloProductos.findOne({
                where: {
                    id: idProducto,
                }
            })
            var buscarCarrito = await ModeloCarrito.findOne({
                where: {
                    id: idVentas,
                }
            })
            if (!buscarProducto) {
                res.send("El idProducto no existe");
            }else if(!buscarCarrito){
                res.send("El idVentas no existe");
            }
            else{
                await ModeloInventario.create({
                    idProducto: idProducto,
                    idCompras: idCompras,
                    idVentas: idVentas,
                    stock: stock
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

exports.modificarStock = async (req, res) => {
    console.log(req.query);
    console.log(req.body);

    const {
        stock
    } = req.body;
    const {
        id
    } = req.query;


    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    } else {
        if (!id || !stock) {
            res.send("Debe enviar los datos completos");
        } else {
            var buscarInventario = await ModeloInventario.findOne({
                where: {
                    id: id,
                }
            })
            if (!buscarInventario) {
                res.send("El id no existe");
            } else {
                buscarInventario.stock = stock;
                await buscarInventario.save()
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



exports.eliminarInventario = async (req, res) => {
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
            await ModeloInventario.destroy({
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