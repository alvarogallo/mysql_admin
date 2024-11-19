// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    const config = {
      host: "autorack.proxy.rlwy.net",
      port: 11702,
      user: "root",
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: "railway",
      ssl: {
        rejectUnauthorized: false
      },
      connectTimeout: 20000
    }
    
    console.log('⚙️ Intentando conectar a MySQL:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      hasPassword: !!config.password
    })

    const connection = await mysql.createConnection(config)
    console.log('✅ Conexión exitosa a la base de datos')
    return connection
  } catch (error) {
    console.error('❌ Error de conexión:', error.message)
    console.error('Detalles de configuración:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      hasPassword: !!config.password
    })
    throw error
  }
}

export default createConnection