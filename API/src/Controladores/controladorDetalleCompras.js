const { bus } = require('nodemon/lib/utils');
const ModeloDetalleCompras = require('../Modelos/modeloDetalleCompras');
const ModeloCompras = require('../Modelos/modeloCompras');
const { validationResult } = require('express-validator');

exports.Inicio = (req,res) =>{
    res.send('Esto es el inicio del modulo Detalle Compras');
};

exports.listarDetalleCompras = async (req, res) => {
    const listarDetalleCompras = await ModeloDetalleCompras.findAll();
    if (listarDetalleCompras.lenght == 0){
        res.send("No existen datos");
    }else{
        res.json(listarDetalleCompras);
    }
};

exports.guardarDetalleCompras = async(req,res) =>{
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const{idCompra, idProducto, precioCompra, cantidad} = req.body;
    if(!idCompra || !idProducto || !precioCompra || !cantidad){
        res.send("Debe enviar los datos completos");
        }else{
            var buscarDetalleCompras = await ModeloCompras.findOne({
                where:{
                    id:idCompra,
                }
            })
            if (!buscarDetalleCompras){
                res.send("El idCompra no existe");
            }else{
                await ModeloDetalleCompras.create({
                    idCompra: idCompra,
                    idProducto: idProducto, 
                    precioCompra: precioCompra,
                    cantidad: cantidad,
                })
                .then((data) =>{
                    console.log(data);
                    res.send("Registro Almacenado");
                })
                .catch((error)=>{
                    console.log(error);
                    res.send("Error al guardar los datos");
                })
            }
            
        }
    }
    
};

exports.modificarDetalleCompras = async (req,res) =>{
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        console.log(req.query);
        console.log(req.body);

        const {id } = req.query;
        const { idCompra, idProducto, precioCompra, cantidad} = req.body;
        if (!idCompra || !idProducto || !precioCompra || !cantidad) {
            res.send("Debe enviar los datos completos");
        }else{
            var buscarDetalleCompras = await ModeloCompras.findOne({
                where:{
                    id:idCompra,
                }
            })
            if (!buscarDetalleCompras) {
                res.send("El idCompra no existe");
            }else{
                buscarDetalleCompras.idCompra = idCompra;
                buscarDetalleCompras.idProducto = idProducto;
                buscarDetalleCompras.precioCompra = precioCompra;
                buscarDetalleCompras.cantidad = cantidad;
                await buscarDetalleCompras.save()
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

exports.eliminarDetalleCompras = async (req, res) => {
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
            await ModeloDetalleCompras.destroy({
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