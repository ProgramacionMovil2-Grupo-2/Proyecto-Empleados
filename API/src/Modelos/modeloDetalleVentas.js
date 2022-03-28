const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const DetalleVenta = db.define(
    "detalleventa",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        idCarrito:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        idProducto:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        cantidad:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        descuento:{
            type:sequelize.DOUBLE,
            allowNull:false,
        }

    },
    {
        tableName: 'detalleVentas',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=DetalleVenta;