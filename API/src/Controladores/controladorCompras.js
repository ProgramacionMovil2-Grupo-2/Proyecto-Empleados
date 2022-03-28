const { bus } = require('nodemon/lib/utils');
const ModeloCompras = require('../Modelos/modeloCompras');
const ModeloProveedor = require('../Modelos/modeloProveedores');
const { validationResult } = require('express-validator');

exports.Inicio = (req,res) =>{
    res.send('Esto es el inicio del modulo Compras');
};

exports.listarCompras = async (req, res) => {
    const listarCompras = await ModeloCompras.findAll();
    if (listarCompras.lenght == 0){
        res.send("No existen datos");
    }else{
        res.json(listarCompras);
    }
};

exports.guardarCompras = async(req,res) =>{
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        const{idProveedor, fecha} = req.body;
        if(!idProveedor){
            res.send("Debe enviar los datos completos");
        }else{
            var buscarCompras = await ModeloProveedor.findOne({
                where:{
                    id:idProveedor,
                }
            })
            if (!buscarCompras){
                res.send("El idProveedor no existe");
            }else{
                await ModeloCompras.create({
                    idProveedor: idProveedor,
                    fecha: fecha,
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

exports.modificarCompras = async (req,res) =>{
    const validacion = validationResult(req);
    if (!validacion.isEmpty()) {
        res.json(validacion.array());
    }
    else {
        console.log(req.query);
        console.log(req.body);

        const {id } = req.query;
        const { idProveedor, fecha} = req.body;
        if (!idProveedor || !fecha) {
            res.send("Debe enviar los datos completos");
        }else{
            var buscarCompras = await ModeloProveedor.findOne({
                where:{
                    id:idProveedor,
                }
            })
            if (!buscarCompras) {
                res.send("El id no existe");
            }else{
                buscarCompras.idProveedor = idProveedor;
                buscarCompras.fecha = fecha;
                await buscarCompras.save()
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

exports.eliminar = async (req, res) => {
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
            await ModeloCompras.destroy({
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