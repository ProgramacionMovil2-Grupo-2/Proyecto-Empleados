const fs = require('fs');
const path = require('path');
const msj = require('../Componentes/mensaje');
const ModeloPersona = require('../Modelos/modeloPersonas');

exports.Recibir = async (req, res) => {
    const { filename } = req.file;
    const id = req.query.id;
    var buscarPersona = await ModeloPersona.findOne({
        where:{
            id: id
        }
    });
    if(!buscarPersona){
        msj("El usuario no existe", 200, [], res);
    }
    else{
        const buscarImagen = fs.existsSync(path.join(__dirname, '../public/imdg'+
        buscarPersona.imagen));
        if(!buscarImagen){
            console.log("La imagen no existe");
        }else{
            try{
                fs.unlinkSync(path.join(__dirname, '../public/img'+
                buscarPersona.imagen));
                console.log("Imagen Eliminada");
            }
            catch(error){
                console.log(error);
                console.log("No se ha podido eliminar");
            }
        }
        buscarPersona.imagen = filename;
        await buscarPersona.save()
        .then((data) =>{
            msj("Imagen actualizada", 200, [], res);
        })
        .catch((error) => {
            console.log(error);
            msj("Error al guardar la imagen", 200, [], res);
        });
    }
}