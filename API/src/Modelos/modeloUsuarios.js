const sequelize = require('sequelize');
const db = require('../configuraciones/db');
const bcrypt = require('bcrypt');
const Usuario = db.define(
    "usuario",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        id_personas:{
            type:sequelize.INTEGER,
            allowNull: false,
        },
        login:{
            type:sequelize.STRING(70),
            allowNull: false,
        },
        correo:{
            type:sequelize.STRING(70),
            allowNull: false,
        },
        contrasena:{
            type:sequelize.STRING(150),
            allowNull: false,
        },
        estado:{
            type:sequelize.STRING(50),
            allowNull: true,
        },
        pin:{
            type:sequelize.CHAR(4),
            allowNull: true,
        }
    },
    {
        tableName: "usuarios",
        timestamps: false,
        hooks:{
            beforeCreate(usuario){
                const hast = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.contrasena=hast;
            },
            beforeUpdate(usuario){
                const hast = bcrypt.hashSync(usuario.contrasena, 10);
                usuario.contrasena=hast;
            }
        }
    }
    
);
Usuario.prototype.verificarContrasena = (con, com) =>{
    return bcrypt.compareSync(con, com);
}

module.exports = Usuario;