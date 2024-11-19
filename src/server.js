// src/server.js
import express from 'express'
import createConnection from './config/database.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

// Ruta para listar tablas
app.get('/tables', async (req, res) => {
  try {
    const connection = await createConnection()
    const [rows] = await connection.query('SHOW TABLES')
    await connection.end()
    
    // Formatear la respuesta
    const tables = rows.map(row => Object.values(row)[0])
    
    res.json({
      message: 'Tablas en la base de datos',
      tables,
      count: tables.length
    })
  } catch (error) {
    res.status(500).json({
      error: 'Error al listar tablas',
      details: error.message
    })
  }
})

// Ruta para ver estructura de una tabla específica
app.get('/table/:name', async (req, res) => {
  try {
    const connection = await createConnection()
    const [rows] = await connection.query('DESCRIBE ??', [req.params.name])
    await connection.end()
    
    res.json({
      message: `Estructura de la tabla ${req.params.name}`,
      columns: rows
    })
  } catch (error) {
    res.status(500).json({
      error: `Error al obtener estructura de ${req.params.name}`,
      details: error.message
    })
  }
})

// Ruta base
app.get('/', (req, res) => {
  res.json({
    message: 'API funcionando',
    endpoints: {
      listTables: '/tables',
      tableStructure: '/table/:name'
    }
  })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})