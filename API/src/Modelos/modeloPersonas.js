const sequelize = require('sequelize');
const db = require('../Configuraciones/db');
const Persona = db.define(
    "persona",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        identidad:{
            type:sequelize.STRING(30),
            allowNull: false,
        },
        nombre:{
            type:sequelize.STRING(70),
            allowNull: false,
        },
        apellido:{
            type:sequelize.STRING(70),
            allowNull: false,
        },
        edad:{
            type:sequelize.INTEGER,
            allowNull: false,
        },
        telefono:{
            type:sequelize.STRING(45),
            allowNull: true,
        },
        rtn:{
            type:sequelize.STRING(70),
            allowNull: true,
        },
        direccion:{
            type:sequelize.STRING(250),
            allowNull: true,
        },
        estado:{
            type:sequelize.STRING(45),
            allowNull: true,
            defaultValue: true, 
        },
        imagen:{
            type:sequelize.STRING(250),
            allowNull: true,
        },
        tipo:{
            type:sequelize.ENUM('CL','EM'),
            allowNull: false,
            defaultValue: 'EM'
        },
    },
    {
        tableName: "personas",
        timestamps: false,
    }
    
);

module.exports = Persona;