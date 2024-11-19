// src/config/database.js
import mysql from 'mysql2/promise'

const createConnection = async () => {
  try {
    // Obtener el host correcto
    const dbHost = process.env.MYSQLHOST === '${RAILWAY_PRIVATE_DOMAIN}' 
      ? process.env.RAILWAY_PRIVATE_DOMAIN  // Usar directamente la variable
      : process.env.MYSQLHOST;              // O usar el host configurado

    const config = {
      host: dbHost,
      port: process.env.MYSQLPORT,
      user: process.env.MYSQLUSER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DATABASE
    }
    
    console.log('⚙️ Intentando conectar con configuración:', {
      host: config.host,
      port: config.port,
      user: config.user,
      database: config.database,
      passwordSet: !!config.password
    })

    const connection = await mysql.createConnection(config)
    console.log('✅ Conexión exitosa a la base de datos')
    return connection
  } catch (error) {
    console.error('❌ Error de conexión:', error.message)
    console.error('Variables disponibles:', {
      MYSQLHOST: process.env.MYSQLHOST,
      RAILWAY_PRIVATE_DOMAIN: process.env.RAILWAY_PRIVATE_DOMAIN,
      MYSQLPORT: process.env.MYSQLPORT,
      MYSQLUSER: process.env.MYSQLUSER,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
      passwordSet: !!process.env.MYSQL_ROOT_PASSWORD
    })
    throw error
  }
}

export default createConnection