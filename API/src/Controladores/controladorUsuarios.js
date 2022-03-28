
const ModeloUsuario = require('../modelos/modeloUsuarios');
const { validationResult } = require('express-validator');

exports.listarUsuarios = async(req, res) => {
    const listaUsuario = await ModeloUsuario.findAll();
    if(listaUsuario.length==0){
        res.send("No existen datos");
    }else{
        res.json(listaUsuario);
    }
};

exports.buscarUsuario = async(req, res) => {
    const { filtro } = req.query;
    const listaUsuario = await ModeloUsuario.findAll({
        where:{
            estado: filtro
        }
    });
    if(listaUsuario.length==0){
        res.send("No existen datos");
    }else{
        res.json(listaUsuario);
    }
};

exports.guardarUsuario = async(req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }else{
        const { id_personas, login, correo, contrasena, estado, pin } = req.body;
        
        if(!correo || !contrasena){
            res.send("Debe enviar los datos completos");
        }else{
            /*const buscarPersona = ModeloPersona.findOne({
                where:{
                    id: id_personas,
                    estado: true
                }
            })*/
            await ModeloUsuario.create({
                id_personas: id_personas,
                login: login,
                correo: correo,
                contrasena: contrasena,
                estado: estado,
                pin: pin
            })
            .then((data)=>{
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

exports.modificarUsuario = async(req, res) => {
    console.log(req.query);
    console.log(req.body);
    const { id } = req.query;
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }else{
        const { id_personas, login, correo, contrasena, estado, pin } = req.body;
        if(!correo || !contrasena){
            res.send("Enviar los datos completos");
        }else{
            var buscarUsuarios = await ModeloUsuario.findOne({
                where:{
                    id: id
                    //estado:'1'
                }
            });
            if(!buscarUsuarios){
                res.send("El id no existe");
            }else{
                buscarUsuarios.id_personas=id_personas;
                buscarUsuarios.login=login;
                buscarUsuarios.correo=correo;
                buscarUsuarios.contrasena=contrasena;
                buscarUsuarios.estado=estado;
                buscarUsuarios.pin=pin;

                await buscarUsuarios.save()
                .then((data)=>{
                    console.log(data);
                    res.send("Registro actualizado");
                })
                .catch((error)=>{
                    console.log(error);
                    res.send("Error al actualizar los datos");
                })
            }
        }
    }
};

exports.eliminarUsuario = async(req, res) => {
    const { id } = req.query;
    if(!id){
        res.send("Enviar los datos completos");
    }else{
        var buscarUsuarios = await ModeloUsuario.findOne({
            where:{
                id: id,
            }
        });
        if(!buscarUsuarios){
            res.send("El id no existe");
        }else{
            await ModeloUsuario.destroy({
                where:
                {
                    id: id,
                }
            })
            .then((data)=>{
                console.log(data);
                res.send("Registro eliminado");
            })
            .catch((error)=>{
                console.log(error);
                res.send("Error al eliminar los datos");
            })
        }
    }
};