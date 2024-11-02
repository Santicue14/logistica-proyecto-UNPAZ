const User = require('../models/User')
const Empleado = require('../models/Empleado')
const Rol = require('../models/Rol')
const RolPermiso = require('../models/RolPermiso')
const Permiso = require('../models/Permiso')

const RolesPermisosController = {
    crearNuevoRol: async (req,res)=>{
        try {
            const {empleado} = req
            const {nombre_rol} = req.body
            console.log(empleado);
            if(empleado.id_rol == 1){
                const response = await Rol.create({nombre_rol})
                return res.status(201).json({message:'Rol creado con éxito',response})
            }
            return res.status(403).json({message: 'Usuario no autorizado a realizar esta acción'})
        } catch (error) {
            console.error(error)
            return res.status(500).json({message:'Ha habido un error al crear el rol',error})
        }
    },

    crearPermiso: async(req,res) =>{
        try {
            const user = req.user.id
            const empleado = await Empleado.findOne({where: {userId:user}})
            const permisoParaCrear = await RolPermiso.findByPk('1')
            const {nombre} = req.body
            console.log(permisoParaCrear);
            if(empleado.id_rol == 1 || permisoParaCrear ){
                const response = await Permiso.create({nombre})
                return res.status(201).json({message:'Permiso creado correctamente', response})
            }
            return res.status(403).json({message: 'Usuario no autorizado a realizar esta acción'})
        } catch (error) {
            return res.status(500).json({message: 'Error al crear el nuevo permiso'})
        }
    },
    agregarPermisosAlRol: async (req, res) => {
        try {
            const { rolId, permisosIds } = req.body;
    
            const rol = await Rol.findByPk(rolId);
            if (!rol) {
                return res.status(404).json({ message: 'No se ha encontrado el rol' });
            }
    
            // Obtener permisos actuales del rol
            const permisosActuales = await RolPermiso.findAll({ where: { rolId } });
    
            // Crear un conjunto de IDs actuales para comparar
            const permisosActualesIds = permisosActuales.map(p => p.permisoId);
    
            // Determinar permisos que deben ser agregados
            const permisosParaAgregar = permisosIds.filter(permisoId => !permisosActualesIds.includes(permisoId));
            
            // Determinar permisos que deben ser eliminados
            const permisosParaEliminar = permisosActualesIds.filter(permisoId => !permisosIds.includes(permisoId));
    
            // Agregar nuevos permisos
            const rolPermisosAgregados = await Promise.all(
                permisosParaAgregar.map(permisoId =>
                    RolPermiso.create({
                        rolId: rol.id,
                        permisoId
                    })
                )
            );
    
            // Eliminar permisos que ya no están
            await Promise.all(
                permisosParaEliminar.map(permisoId =>
                    RolPermiso.destroy({
                        where: {
                            rolId: rol.id,
                            permisoId
                        }
                    })
                )
            );
    
            return res.status(200).json({
                message: 'Se han actualizado los permisos del rol',
                rolPermisosAgregados,
                permisosEliminados: permisosParaEliminar
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar los permisos del rol' });
        }
    },
    
    consultarPermisosDelRolPorUsuario: async(req,res) =>{
        try {
            const {empleado} = req
            const {id_rol} = empleado
            const permisos = await RolPermiso.findAll({where: {rolId: id_rol}})
            if(permisos.length== 0){
                return res.status(404).json({message: 'No se han encontrado permisos para el rol'})
            }
            const permisosNombres = await Promise.all(permisos.map(async (permiso) =>{
                const permisoCompleto = await Permiso.findByPk(permiso.permisoId)
                return{
                    id: permisoCompleto.id,
                    nombre: permisoCompleto.nombre
                }
            }))

            return res.status(200).json({message: 'Permisos del rol obtenidos éxitosamente',permisos: permisosNombres})
        } catch (error) {
            return res.status(500).json({message:'Ha ocurrido un error al listar los permisos del rol'})
        }
    },
    consultarPermisosRoles: async (req,res) =>{
        try {
            const {empleado} = req
            
        } catch (error) {
            
        }
    }
}

module.exports = RolesPermisosController;