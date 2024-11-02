const express = require('express')
const EstadosController =require('../controllers/tipos_estados.controller') 
const router = express.Router()

router.post('/envios',EstadosController.crearTipoDeEstadoDeEnvios)
router.post('/cuentas',EstadosController.crearEstadoDeCuenta)

module.exports = router