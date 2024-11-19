// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    const config = {
      host: 'mysql.railway.internal',  // Host interno de Railway
      port: 3306,                      // Puerto por defecto
      user: 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: 'railway'
    }
    
    console.log('⚙️ Intentando conectar a MySQL interno de Railway:', {
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
    throw error
  }
}

export default createConnection