// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    // Para debug - NO incluir en producción
    console.log('Variables disponibles:', {
      MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD || 'no disponible',
      MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'no disponible',
      RAILWAY_ENVIRONMENT: process.env.RAILWAY_ENVIRONMENT || 'no disponible'
    })

    const config = {
      host: 'autorack.proxy.rlwy.net',
      port: 11702,
      user: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD, // Debe coincidir EXACTAMENTE con el nombre en Railway
      database: 'railway'
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
    console.error('🔍 Detalles de configuración:', {
      host_set: !!config.host,
      port_set: !!config.port,
      user_set: !!config.user,
      password_set: !!config.password,
      database_set: !!config.database
    })
    throw error
  }
}

export default createConnection