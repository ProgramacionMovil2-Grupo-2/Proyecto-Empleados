const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const Pedido = db.define(
    "pedido",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        idventa:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        fechaPedido:{
            type:sequelize.DATE,
            allowNull:false,
        }
       

    },
    {
        tableName: 'pedidos',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Pedido;