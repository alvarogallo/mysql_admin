// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    const config = {
      host: 'autorack.proxy.rlwy.net',
      port: 11702,
      user: 'root',
      password: 'fIMIPIsVpwbKUVKkJRNWxidyxxkCowSW', // Aquí pon el MYSQL_ROOT_PASSWORD que te da Railway
      database: 'railway'
    }
    
    console.log('⚙️ Intentando conectar con configuración:', {
      ...config,
      password: '****' // Ocultamos la contraseña en los logs
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