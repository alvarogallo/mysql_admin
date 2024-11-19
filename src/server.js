import express from 'express'
import dotenv from 'dotenv'
import createConnection from './config/database.js'

// Cargar variables de entorno
dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' })
})

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor'
  })
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Ruta no encontrada'
  })
})

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    // Intentar conectar a la base de datos
    const connection = await createConnection()
    
    // Guardar la conexión para uso global
    app.locals.db = connection
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
      console.log(`📦 Base de datos conectada`)
    })
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message)
    process.exit(1)
  }
}

startServer()

// Manejo de señales de terminación
process.on('SIGTERM', () => {
  console.log('👋 Cerrando servidor...')
  if (app.locals.db) {
    app.locals.db.end()
  }
  process.exit(0)
})

export default app