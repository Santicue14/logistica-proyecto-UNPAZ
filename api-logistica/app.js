require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const sequelize = require('./config/database')


//RUTAS
const EstadosEnviosRoutes = require('./routes/estadosenvios.routes')
const EmpleadosRoutes = require('./routes/empleados.routes')
const RolesPermisosRoutes = require('./routes/rolespermisos.routes')
const AuthRoutes = require('./routes/auth.routes')

const API_PORT = process.env.API_PORT
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: '*',
    credentials: true
}))


app.use('/auth',AuthRoutes)
app.use('/api/estados',EstadosEnviosRoutes)
app.use('/api/usuarios',EmpleadosRoutes)
app.use('/api/roles',RolesPermisosRoutes)


sequelize.authenticate()
    .then(()=>{
        console.log('Conexión exitosa');
    })
    .catch(error =>{
        console.error('Error al conectarse a la BD',error)
    })

sequelize.sync()
    .then(()=>{
        console.log('Modelos sincronizados correctamente');
    })
    .catch(error=>{
        console.error('Error al sincronizar los modelos', error)
    })

app.listen(API_PORT, ()=>{
    console.log(`Server on port ${API_PORT}`);
})