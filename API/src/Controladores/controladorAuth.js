const enviarCorreo = require('../configuraciones/correo');
const modeloUsuario = require('../modelos/modeloUsuarios');
const { validationResult } = require('express-validator');
const passport = require('../configuraciones/passport');
const msj = require('../componentes/mensaje');

exports.recuperarContrasena = async (req, res)=>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        res.json(validacion.array());
    }else{
        const { correo } = req.body;
        var buscarUsuario = await modeloUsuario.findOne({
            correo
        });
        const pin='1234';
        if(buscarUsuario){
            const data = {
                correo: correo,
                pin: pin,
            };
            if(enviarCorreo.recuperarContrasena(data)){
                res.send("Correo enviado");
            }else{
                res.send("Error al enviar el correo");
            }
        }
    }

};

exports.ValidarAutenticado = passport.ValidarAutenticado;

exports.InicioSesion = async(req, res) =>{
    const validacion = validationResult(req);
    if(!validacion.isEmpty()){
        msj("Los datos son invalidos", 200, validacion.array(), res);
    }else{
        const { usuario, contrasena } = req.body;
        const buscarUsuario = await modeloUsuario.findOne({
            where:{
                correo: usuario,
            }
        });
        if(!buscarUsuario){
            msj("El usuario o contraseña son incorrectos", 200, [], res);
        }else{
            if(!buscarUsuario.verificarContrasena(contrasena, buscarUsuario.contrasena)){
                msj("El usuario o contraseña son incorrectos", 200, [], res);
            }else{
                const Token = passport.generarToken({id: buscarUsuario.id});
                const data = {
                    token: Token,
                    data: buscarUsuario
                };
                msj("BIENVENIDO", 200, data, res);
            }
        }
    }
};

exports.Error = (req, res) => {
    msj("Debe estar autenticado", 200, [], res);
};