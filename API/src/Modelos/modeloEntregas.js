const sequelize = require('sequelize');
const db = require('../Configuraciones/db');

const Entrega = db.define(
    "entrega",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        idpedido:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        fecha:{
            type:sequelize.DATE,
            allowNull:false,
        }, 
        estado:{
            type:sequelize.TINYINT(1),
            allowNull:false,
            defaultValue: true,
        }, 
        costo:{
            type:sequelize.INTEGER,
            allowNull:true,
        },
        idsucursal:{
            type:sequelize.INTEGER,
            allowNull:false,
        }

       

    },
    {
        tableName: 'entregas',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Entrega;