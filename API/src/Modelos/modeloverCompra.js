const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const verCompra = db.define(
    "verComprad",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
        },
        idCompra:{
            type:sequelize.INTEGER,
        },
        nombre:{
            type:sequelize.STRING,
        },
        codigobarras:{
            type:sequelize.STRING,
        },
        precioCompra:{
            type:sequelize.DOUBLE,
        },
        cantidad:{
            type:sequelize.INTEGER,
        },
        fecha:{
            type:sequelize.DATE,
        },

    },
    {
        tableName: 'verComprad',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=verCompra;