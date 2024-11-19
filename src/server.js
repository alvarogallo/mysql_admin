// src/server.js
import express from 'express'
import createConnection from './config/database.js'
import createUsersTable from './config/users.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

// Inicializar tabla users al arrancar
const initializeDatabase = async () => {
  try {
    await createUsersTable()
  } catch (error) {
    console.error('Error inicializando base de datos:', error)
  }
}

// Rutas existentes...

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
  initializeDatabase()
})