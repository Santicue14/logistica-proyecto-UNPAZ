const express = require('express')
const EmpleadoController =require('../controllers/empleado.controller') 
const registrarUsuario = require('../middlewares/registroDeUsuario')
const router = express.Router()

router.post('/crearDirector',registrarUsuario,EmpleadoController.creacionDeDirector)

module.exports = router