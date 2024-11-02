const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(403).json({ message: 'Token requerido' });

    jwt.verify(token, JWT_SECRET, async(err, decoded) => {
        if (err) return res.status(401).cookie('token', token, {httpOnly: true,secure: true, sameSite: 'Strict',maxAge: 24 * 60 * 60 * 1000 }).json({ message: 'Token inválido' });
        req.userId = decoded.id; // Guarda el ID del usuario
        const user = await User.findByPk(req.userId)
        if(!user){return res.status(500).json({message: 'No se ha encontrado un usuario con ese id'})}
        req.user = user
        next();
    });
};

module.exports = authMiddleware;
