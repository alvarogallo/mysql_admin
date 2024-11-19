// src/config/database.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: 'autorack.proxy.rlwy.net',
      port: 11702,          // Este es el puerto específico de tu instancia
      user: 'root',
      password: process.env.DB_PASSWORD,  // El MYSQL_ROOT_PASSWORD de tus variables
      database: 'railway'
    })
    
    console.log('✅ Conexión exitosa a la base de datos de Railway')
    return connection
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message)
    throw error
  }
}

export default createConnection