const sequelize = require('sequelize');
const db = new sequelize(
    'Farmacia_Grupo2', //Nombre de la base de datos
    'root', //Usuario de la base
    'ca1d3r0n', //Contraseña del usuario
    {
        host: 'localhost', //servidor
        dialect: 'mysql', //dbms
        port: '3306'
    }
);

module.exports=db;