// src/server.js
import express from 'express'
import createConnection from './config/database.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' })
})

// Ruta para probar la conexión a la base de datos
app.get('/test-db', async (req, res) => {
  try {
    const connection = await createConnection()
    const [rows] = await connection.query('SELECT 1 + 1 as result')
    await connection.end()
    res.json({ 
      message: 'Conexión exitosa', 
      result: rows[0].result,
      dbVars: {
        host: process.env.MYSQLHOST || 'no definido',
        port: process.env.MYSQLPORT || 'no definido',
        user: process.env.MYSQLUSER || 'no definido',
        database: process.env.MYSQL_DATABASE || 'no definido',
        password_exists: !!process.env.MYSQL_ROOT_PASSWORD
      }
    })
  } catch (error) {
    res.status(500).json({ 
      error: error.message,
      dbVars: {
        host: process.env.MYSQLHOST || 'no definido',
        port: process.env.MYSQLPORT || 'no definido',
        user: process.env.MYSQLUSER || 'no definido',
        database: process.env.MYSQL_DATABASE || 'no definido',
        password_exists: !!process.env.MYSQL_ROOT_PASSWORD
      }
    })
  }
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
  console.log('Variables de entorno detectadas:', {
    MYSQLHOST: process.env.MYSQLHOST || 'no definido',
    MYSQLPORT: process.env.MYSQLPORT || 'no definido',
    MYSQLUSER: process.env.MYSQLUSER || 'no definido',
    MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'no definido',
    MYSQL_ROOT_PASSWORD: !!process.env.MYSQL_ROOT_PASSWORD
  })
})