const bcrypt = require('bcryptjs')
const UserModel = require('../models/User');
const EstadoDeCuenta = require('../models/EstadoDeCuenta');

const registrarUsuario = async (req, res, next) => {
    try {
        const {nombre, apellido, telefono, dni, mail, password} = req.body
        const hashedPass = await bcrypt.hash(password,10)
        const nuevoUsuario = await UserModel.create({
            nombre,
            apellido,
            mail,
            telefono,
            dni,
            password: hashedPass,
            id_estado: 1
        });

        // Agregar userId al objeto req para los siguientes pasos
        req.userId = nuevoUsuario.id;

        next(); // Continuar con el siguiente middleware
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

module.exports = registrarUsuario;
