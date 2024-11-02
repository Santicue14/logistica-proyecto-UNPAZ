const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Modelo de usuario
const { JWT_SECRET } = process.env; // Definir en tu archivo .env

// Ruta de login
const authController = {
    login: async (req,res)=> {
        const { mail, password } = req.body;
        try {
            // Busca el usuario por email
            const user = await User.findOne({ where: { mail } });
            if (!user) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
    
            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
    
            // Generar token JWT
            const token = jwt.sign(
                { id: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '1h' } // Duración del token
            );
    
            res.status(200).cookie('token', token, {httpOnly: true,secure: true, sameSite: 'Strict',maxAge: 24 * 60 * 60 * 1000 }).json({
                message: 'Login exitoso',
            });
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getUserDataFromAuth: async (req,res)=>{
        try {
            const {user} = req
            if(!user){
                return res.status(401).json({message:'No estás logueado'})
            }
            return res.status(200).json({message: 'User founded', user})
        }catch (error) {
            return res.status(401).json({message:'Token expired or invalid',error})
        }
    }
}
module.exports = authController