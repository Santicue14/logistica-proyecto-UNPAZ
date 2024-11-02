const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Rol = sequelize.define('Rol', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre_rol: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'rol',
    timestamps: true,
});

module.exports = Rol;
