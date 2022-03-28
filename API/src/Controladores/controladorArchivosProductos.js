const fs = require('fs');
const path = require('path');
const msj = require('../Componentes/mensaje');
const ModeloProductos = require('../Modelos/modeloProductos');

exports.Recibir = async (req, res) => {
    const { filename } = req.file;
    const id = req.query.id;
    var buscarProducto = await ModeloProductos.findOne({
        where:{
            id: id
        }
    });
    if(!buscarProducto){
        msj("El producto no existe", 200, [], res);
    }
    else{
        const buscarImagen = fs.existsSync(path.join(__dirname, '../public/img'+
        buscarProducto.imagen));
        if(!buscarImagen){
            console.log("La imagen no existe");
        }else{
            try{
                fs.unlinkSync(path.join(__dirname, '../public/img'+
                buscarProducto.imagen));
                console.log("Imagen Eliminada");
            }
            catch(error){
                console.log(error);
                console.log("No se ha podido eliminar");
            }
        }
        buscarProducto.imagen = filename;
        await buscarProducto.save()
        .then((data) =>{
            msj("Imagen actualizada", 200, [], res);
        })
        .catch((error) => {
            console.log(error);
            msj("Error al guardar la imagen", 200, [], res);
        });
    }
}