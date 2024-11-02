const User = require('../models/User')
const Empleado = require('../models/Empleado')

const typeOfUserMiddleware = async(req,res,next)=>{
    const {user} = req
    const empleado = await Empleado.findOne({where:{userId: user.id}})
    if(empleado){req.empleado = empleado}
    if(!empleado){return res.status(404).json({message:'No se ha encontrado un tipo de usuario con ese ID'})}
    next()
}

module.exports = typeOfUserMiddleware