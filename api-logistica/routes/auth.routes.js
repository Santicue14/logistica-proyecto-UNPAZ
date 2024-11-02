const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/authMiddleware')
// Ruta de login
router.post('/login', authController.login);
router.get('/getData',authMiddleware, authController.getUserDataFromAuth);

module.exports = router;
