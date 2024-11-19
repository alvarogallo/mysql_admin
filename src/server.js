// src/server.js
import express from 'express'
import createConnection from './config/database.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

const startServer = async () => {
  try {
    // Intentar conectar a la base de datos
    await createConnection()
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    })
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message)
    process.exit(1)
  }
}

startServer()