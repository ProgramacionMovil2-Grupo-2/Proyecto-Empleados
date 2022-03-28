const sequelize = require('sequelize');
const db = require('../configuraciones/db');

const Productos = db.define(
    "productos",
    {
        id:{
            type:sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull: false,
        },
        nombre:{
            type:sequelize.STRING(45),
            allowNull:false,
        },
        fechavencimiento:{
            type:sequelize.DATE,
            allowNull:false,
        },
        codigobarras:{
            type:sequelize.STRING(45),
            allowNull:false,
        },
        descripcion:{
            type:sequelize.STRING(250),
            allowNull:true,
        },
        impuesto:{
            type:sequelize.DOUBLE,
            allowNull:false,
        },
        precio:{
            type:sequelize.DOUBLE,
            allowNull:false,
        },
        idtipo:{
            type:sequelize.INTEGER,
            allowNull:false,
        },
        imagen:{
            type:sequelize.STRING(250),
            allowNull:true,
        },
        estado:{
            type:sequelize.BOOLEAN,
            allowNull:true,
            defaultValue: true,
        }

    },
    {
        tableName: 'Productos',
        timestamps: false,//fecha y hora de creacion del registro y modificacion
    }
);

module.exports=Productos;