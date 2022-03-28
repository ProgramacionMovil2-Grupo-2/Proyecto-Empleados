const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const Venta = db.define(
    "venta",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        idClientes:{
            type:sequelize.INTEGER,
            allowNull:false,
        }

    },
    {
        tableName: 'Ventas',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Venta;
