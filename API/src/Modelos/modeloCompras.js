const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const Compras = db.define(
    "compras",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        idProveedor:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        fecha:{
            type:sequelize.DATE,
            allowNull:false,
        }
    },
    {
        tableName: 'compras',//llamar en singular
        timestamps: false,
    }
);

module.exports=Compras;
