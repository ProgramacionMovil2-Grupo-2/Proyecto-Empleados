const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const DetalleCarritoV = db.define(
    "detallecarritov",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            
        },
        idCarrito:{
            type:sequelize.INTEGER,
            
        },
        nombre:{
            type:sequelize.STRING,
        },
        codigobarras:{
            type:sequelize.STRING,
        },
        impuesto:{
            type:sequelize.DOUBLE,
        },
        precio:{
            type:sequelize.DOUBLE,
        },
        descripcion:{
            type:sequelize.STRING,
        },
        cantidad:{
            type:sequelize.INTEGER,
        },
        descuento:{
            type:sequelize.DOUBLE,
        },
        imagen: {
            type:sequelize.STRING,
        },

    },
    {
        tableName: 'DetalleCarritoV',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=DetalleCarritoV;