const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const Inventario = db.define(
    "inventario",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        idProducto:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        idCompras:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        idVentas:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        stock:{
            type:sequelize.DOUBLE,
            allowNull:false,
        }

    },
    {
        tableName: 'Inventario',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Inventario;