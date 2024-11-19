// src/server.js
import express from 'express'
import createConnection from './config/database.js'

const app = express()
app.use(express.json())

const PORT = process.env.PORT || 3000

// Función para crear tabla users
const createUsersTable = async () => {
  let connection;
  try {
    connection = await createConnection()
    
    // Verificar si la tabla existe
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_NAME = 'users'
    `)
    
    if (tables.length === 0) {
      // Si no existe, crear la tabla
      await connection.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(100) UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          last_login TIMESTAMP NULL,
          is_active BOOLEAN DEFAULT true,
          role ENUM('admin', 'user') DEFAULT 'user'
        )
      `)
      console.log('✅ Tabla users creada exitosamente')
    } else {
      console.log('ℹ️ La tabla users ya existe')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

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

// Inicializar base de datos y ar