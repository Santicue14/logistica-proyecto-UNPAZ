const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const EstadoDeCuenta = require('./EstadoDeCuenta');

const UserModel = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    apellido: {
        type: DataTypes.STRING(150),
        allowNull: true,
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    dni: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mail: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING(300),
        allowNull: true
    },
    id_estado: {
        type: DataTypes.INTEGER,
        references: {
            model: EstadoDeCuenta,
            key: 'id'
        },
        allowNull: true
    }
}, {
    timestamps: true
});

// Relación con EstadoDeCuenta
UserModel.belongsTo(EstadoDeCuenta, { foreignKey: 'id_estado', as: 'estadoCuenta' });

module.exports = UserModel;
