const  EstadoEnvio  = require("../models/EstadoEnvío");
const EstadoDeCuenta = require('../models/EstadoDeCuenta')

const EstadosController = {
    crearTipoDeEstadoDeEnvios: async (req, res) => {
        console.log(req.body);
        try {
            const { descripcion } = req.body;
            const response = await EstadoEnvio.create({descripcion})
            return res.status(201).json({ response, message: 'Se agregó el nuevo estado de envíos' });
        } catch (error) {
            console.error('Error al crear el estado de envío:', error); // Esto imprime el error en la consola
            return res.status(500).json({
                message: 'Ha habido un error al crear un nuevo tipo',
                error: error.message // Proporciona más detalles del error en la respuesta
            });
        }
    },
    crearEstadoDeCuenta: async (req,res) =>{
        try {
            const {estado} = req.body
            const response = await EstadoDeCuenta.create({estado})
            return res.status(201).json({response, message:'Nuevo estado de cuenta agregado con éxito'})
        } catch (error) {
            console.error('Error al crear el nuevo estado de cuenta')
            return res.status(500).json({
                message: 'Ha habido un error al crear el nuevo estado de cuenta',
                error: error.message
            })
        }
    }
}

module.exports = EstadosController