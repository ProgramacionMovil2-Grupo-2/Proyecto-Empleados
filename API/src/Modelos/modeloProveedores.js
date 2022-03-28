const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Proveedores = db.define(
    "proveedores",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        descripcion:{
            type:sequelize.STRING(45),
            allowNull:false,
        },
        telefono:{
            type:sequelize.STRING(9),
            allowNull:true,
        },
        direccion:{
            type:sequelize.STRING(250),
            allowNull:true,
        }

    },
    {
        tableName: 'proveedores',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Proveedores;