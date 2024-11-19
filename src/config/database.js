// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    const config = {
      host: 'autorack.proxy.rlwy.net',  // Host fijo de Railway
      port: 11702,                      // Puerto fijo de Railway
      user: 'root',                     // Usuario de Railway
      password: process.env.MYSQL_ROOT_PASSWORD, // Password de las variables de Railway
      database: 'railway'               // Nombre de base de datos fijo
    }
    
    console.log('⚙️ Intentando conectar con configuración:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      passwordExists: !!config.password
    })

    const connection = await mysql.createConnection(config)
    
    console.log('✅ Conexión exitosa a la base de datos de Railway')
    return connection
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message)
    console.error('Variables de entorno disponibles:', {
      MYSQL_ROOT_PASSWORD: !!process.env.MYSQL_ROOT_PASSWORD,
      RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT || 'no definido'
    })
    throw error
  }
}

export default createConnection