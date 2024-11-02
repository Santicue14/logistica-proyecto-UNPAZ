const Empleado = require('../models/Empleado');
const UserModel = require('../models/User');

const EmpleadoController = {
    creacionDeDirector: async (req,res)=>{
        try {  
            const { legajo } = req.body;
            const userId = req.userId

            const usuario = await UserModel.findByPk(userId)

            if(!usuario){
                return res.status(404).json({message: 'No se encontró al ID de usuario'})
            }

            const response = await Empleado.create({
                userId,
                legajo,
                id_rol:1
            })
            return res.status(201).json({message: 'Director creado con éxito',response})
        } catch (error) {
            return res.status(500).json({message: 'Ha habido un error al crear el director', error})
        }
    },
    finalizarRegistroEmpleado: async(req,res)=>{
        try {
            
        } catch (error) {
            
        }
    }
}
module.exports = EmpleadoController;