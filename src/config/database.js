// src/config/database.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const createConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    })
    console.log('Conexión a la base de datos establecida')
    return connection
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message)
    throw error
  }
}

export default createConnection

