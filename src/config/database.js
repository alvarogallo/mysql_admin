// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    console.log('Variables de entorno detectadas:', {
      DB_HOST: !!process.env.DB_HOST,
      DB_USER: !!process.env.DB_USER,
      DB_PASSWORD: !!process.env.DB_PASSWORD,
      DB_NAME: !!process.env.DB_NAME,
      DB_PORT: !!process.env.DB_PORT
    })

    const config = {
      host: process.env.DB_HOST || 'mysql',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'railway'
    }
    
    console.log('⚙️ Intentando conectar con configuración:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      passwordSet: !!config.password
    })

    const connection = await mysql.createConnection(config)
    
    console.log('✅ Conexión exitosa a la base de datos de Railway')
    return connection
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message)
    throw error
  }
}

export default createConnection