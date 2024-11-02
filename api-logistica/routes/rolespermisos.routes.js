const express = require('express')
const RolesPermisosControllers = require('../controllers/rolespermisos.controller')
const authMiddleware = require('../middlewares/authMiddleware')
const typeOfUser = require('../middlewares/typeOfUser')
const router = express.Router()

router.post('/crearRol',authMiddleware,typeOfUser,RolesPermisosControllers.crearNuevoRol)
router.post('/crearPermiso',authMiddleware,typeOfUser,RolesPermisosControllers.crearPermiso)
router.post('/agregarPermisosARol',authMiddleware,typeOfUser,RolesPermisosControllers.agregarPermisosAlRol)
router.get('/getPermisosfromRol',authMiddleware,typeOfUser,RolesPermisosControllers.consultarPermisosDelRolPorUsuario)

module.exports = router;