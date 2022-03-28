
const ModeloPersona = require('../modelos/modeloPersonas');
const { validationResult } = require('express-validator');

exports.inicio = (req, res) => {
    res.send("Esto es el inicio de el módulo personas");

};

exports.listarPersonas = async(req, res) => {
    const listaPersonas = await ModeloPersona.findAll();
    if(listaPersonas.length==0){
        res.send("No existen datos");
    }else{
        //console.log(listaPersonas);
        res.json(listaPersonas);
    }
};

exports.guardar = async(req, res) => {
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }else{
        const { identidad, nombre,  apellido, edad, telefono, rtn, 
            direccion, estado, imagen, tipo } = req.body;
        
        if(!identidad || !nombre || !apellido){
            res.send("Debe enviar los datos completos");
        }else{
            await ModeloPersona.create({
                identidad: identidad,
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                telefono: telefono,
                rtn: rtn,
                direccion: direccion,
                estado: estado,
                imagen: imagen,
                tipo: tipo
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

exports.modificar = async(req, res) => {
    console.log(req.query);
    console.log(req.body);
    const { id } = req.query;
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }else{
        const {  identidad, nombre,  apellido, edad, telefono, rtn, 
            direccion, estado, imagen, tipo } = req.body;
        if(!id || !nombre || !apellido){
            res.send("Enviar los datos completos");
        }else{
            var buscarPersonas = await ModeloPersona.findOne({
                where:{
                    id: id,
                }
            });
            if(!buscarPersonas){
                res.send("El id no existe");
            }else{
                buscarPersonas.identidad=identidad;
                buscarPersonas.nombre=nombre;
                buscarPersonas.apellido=apellido;
                buscarPersonas.edad=edad;
                buscarPersonas.telefono=telefono;
                buscarPersonas.rtn=rtn;
                buscarPersonas.direccion=direccion;
                buscarPersonas.estado=estado;
                buscarPersonas.imagen=imagen;
                buscarPersonas.tipo=tipo;
                
                await buscarPersonas.save()
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

exports.eliminar = async(req, res) => {
    const { id } = req.query;
    if(!id){
        res.send("Enviar los datos completos");
    }else{
        var buscarPersonas = await ModeloPersona.findOne({
            where:{
                id: id,
            }
        });
        if(!buscarPersonas){
            res.send("El id no existe");
        }else{
            await ModeloPersona.destroy({
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