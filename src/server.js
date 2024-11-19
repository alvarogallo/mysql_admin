// src/server.js
import express from 'express'
import createConnection from './config/database.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

// Ruta para listar tablas
app.get('/tables', async (req, res) => {
  let connection;
  try {
    connection = await createConnection()
    const [rows] = await connection.query('SHOW TABLES')
    
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
  } finally {
    if (connection) {
      await connection.end()
    }
  }
})

// Ruta para ver estructura de una tabla
app.get('/table/:name', async (req, res) => {
  let connection;
  try {
    connection = await createConnection()
    const [structure] = await connection.query('DESCRIBE ??', [req.params.name])
    const [rows] = await connection.query('SELECT COUNT(*) as count FROM ??', [req.params.name])
    
    res.json({
      message: `Estructura de la tabla ${req.params.name}`,
      structure,
      rowCount: rows[0].count
    })
  } catch (error) {
    res.status(500).json({
      error: `Error al obtener estructura de ${req.params.name}`,
      details: error.message
    })
  } finally {
    if (connection) {
      await connection.end()
    }
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