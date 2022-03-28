const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Tipos = db.define(
    "tipo",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        descripcion:{
            type:sequelize.STRING(45),
            allowNull:false,
        }

    },
    {
        tableName: 'tipos',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Tipos;