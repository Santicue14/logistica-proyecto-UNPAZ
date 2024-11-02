const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EstadoEnvio = sequelize.define('EstadoEnvio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    descripcion: {
        type: DataTypes.STRING(100),
        defaultValue: 0,
    },
}, {
    tableName: 'EstadoEnvio',
    timestamps: true,
});

module.exports = EstadoEnvio; // Exporta el modelo correctamente
