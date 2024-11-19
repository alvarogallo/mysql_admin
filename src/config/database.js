// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    const config = {
      host: process.env.MYSQL_HOST || 'mysql.railway.internal',  // o el host que te proporciona Railway
      port: process.env.MYSQL_PORT || 11702, // o el puerto que te proporciona Railway
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE || 'railway'
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
    console.error('Variables disponibles:', {
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_PORT: process.env.MYSQL_PORT,
      MYSQL_USER: process.env.MYSQL_USER,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
      hasPassword: !!process.env.MYSQL_ROOT_PASSWORD
    })
    throw error
  }
}

export default createConnection