const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UserModel = require('./User');
const Rol = require('./Rol');

const Empleado = sequelize.define('Empleado', {
    legajo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    id_rol: {
        type: DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'id'
        },
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: UserModel,
            key: 'id'
        },
        allowNull: false
    }
}, {
    timestamps: true
});

// Relación con UserModel
UserModel.hasOne(Empleado, { foreignKey: 'userId', as: 'empleado' });
Empleado.belongsTo(UserModel, { foreignKey: 'userId' });

// Relación con Rol
Empleado.belongsTo(Rol, { foreignKey: 'id_rol', as: 'rol' });

module.exports = Empleado;
