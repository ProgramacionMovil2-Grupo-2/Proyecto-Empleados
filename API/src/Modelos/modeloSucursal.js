const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const Sucursal = db.define(
    "sucursal",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        ciudad:{
            type:sequelize.STRING(45),
            allowNull:false,
        },
        direccion:{
            type:sequelize.STRING(250),
            allowNull:false,
        },
        
        telefono:{
            type:sequelize.STRING(9),
            allowNull:false,
        }
       

    },
    {
        tableName: 'sucursal',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Sucursal;