const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstadoDeCuenta = sequelize.define('EstadoDeCuenta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    estado: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
}, {
    tableName: 'EstadoDeCuenta',
    timestamps: true,
});

module.exports = EstadoDeCuenta;
