// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    const config = {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    }
    
    console.log('⚙️ Intentando conectar a la base de datos...')

    const connection = await mysql.createConnection(config)
    
    console.log('✅ Conexión exitosa a la base de datos de Railway')
    return connection
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message)
    throw error
  }
}

export default createConnection