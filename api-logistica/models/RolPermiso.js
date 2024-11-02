const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Rol = require('./Rol');
const Permiso = require('./Permiso');

const RolPermiso = sequelize.define('RolPermiso', {
    rolId: {
        type: DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'id'
        }
    },
    permisoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permiso,
            key: 'id'
        }
    }
}, {
    tableName: 'RolPermiso',
    timestamps: false
});

Rol.belongsToMany(Permiso, { through: RolPermiso, foreignKey: 'rolId' });
Permiso.belongsToMany(Rol, { through: RolPermiso, foreignKey: 'permisoId' });

module.exports = RolPermiso;
