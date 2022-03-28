const ModeloSucursal = require('../Modelos/modeloSucursal');
const { validationResult } = require('express-validator');
const { bus } = require('nodemon/lib/utils');

exports.listar = async(req, res) => {
    const lista = await ModeloSucursal.findAll();
    if(lista.length==0){
        res.send("No existen datos");
    }
    else{
        res.json(lista);
    } 
};


exports.buscarCiudad = async(req, res) => {
        const {ciudad} = req.query;
        const lista = await ModeloSucursal.findAll({
            where:{
                ciudad : ciudad
            }
        });
        if(lista.length==0){
            res.send("No existen datos");
        }
        else{
            res.json(lista);
        } 
};


exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    } 
    else{
        const { ciudad, direccion, telefono } = req.body;
        if(!ciudad || !direccion || !telefono ){
            res.send("Debe enviar los datos completos");
        }
        else{
            await ModeloSucursal.create({
                ciudad: ciudad,
                direccion : direccion,
                telefono : telefono
            })  .then((data)=>{
                console.log(data);
                res.send("Registro almacenado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al guardar los datos");
            });
        }

    }   
};


exports.modificar = async(req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    } 
    else{
        const { id } = req.query;
        const {  direccion, telefono } = req.body;
        if(!id ||  !direccion || !telefono ){
            res.send("Envie los datos completos");
        }
        else{
            var buscar = await ModeloSucursal.findOne({
                where:{
                    id:id,
                }
            });
            if(!buscar){
                res.send("El id no existe");
            }
            else{
                buscar.direccion=direccion;
                buscar.telefono = telefono;
               await buscar.save()
               .then((data)=>{
                   console.log(data);
                   res.send("Registro actualizado");
               })
               .catch((error)=>{
                   console.log(error);
                   res.send("Error al actualizar los datos");
               });
            }
        }
    }    
};


exports.modificarDireccion = async(req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    } 
    else{
        const { id } = req.query;
        const {  direccion } = req.body;
        if(!id ||  !direccion ){
            res.send("Envie los datos completos");
        }
        else{
            var buscar = await ModeloSucursal.findOne({
                where:{
                    id:id,
                }
            });
            if(!buscar){
                res.send("El id no existe");
            }
            else{
                buscar.direccion=direccion;
               await buscar.save()
               .then((data)=>{
                   console.log(data);
                   res.send("Registro actualizado");
               })
               .catch((error)=>{
                   console.log(error);
                   res.send("Error al actualizar los datos");
               });
            }
        }
    }    
};


exports.modificarTelefono = async(req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    } 
    else{
        const { id } = req.query;
        const {  telefono } = req.body;
        if(!id ||  !telefono ){
            res.send("Envie los datos completos");
        }
        else{
            var buscar = await ModeloSucursal.findOne({
                where:{
                    id:id,
                }
            });
            if(!buscar){
                res.send("El id no existe");
            }
            else{
                buscar.telefono=telefono;
               await buscar.save()
               .then((data)=>{
                   console.log(data);
                   res.send("Registro actualizado");
               })
               .catch((error)=>{
                   console.log(error);
                   res.send("Error al actualizar los datos");
               });
            }
        }
    }    
};


exports.eliminar = async(req, res) => {
    const { id } = req.query;
    if(!id){
        res.send("Envie el id del registro");
    }
    else{
        var buscar = await ModeloSucursal.findOne({
            where:{
                id:id,
            }
        });
        if(!buscar){
            res.send("El id no existe");
        }
        else{
            await ModeloSucursal.destroy({
                where:{
                    id: id,
                }
            })
           .then((data)=>{
               console.log(data);
               res.send("Registro eliminado");
           })
           .catch((error)=>{
               console.log(error);
               res.send("Error al eliminar el registro");
           });
        }
    }
};
