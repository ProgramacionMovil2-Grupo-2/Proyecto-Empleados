const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const detalleCompras = db.define(
    "detallecompra",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        idCompra:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        idProducto:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        precioCompra:{
            type:sequelize.DOUBLE,
            allowNull:false,
        },
        cantidad:{
            type:sequelize.INTEGER,
            allowNull:false,
        }
    },
    {
        tableName: 'detallecompra',//llamar en singular
        timestamps: false,
    }
);

module.exports=detalleCompras;
