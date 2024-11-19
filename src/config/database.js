// src/config/database.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envPath = path.join(__dirname, '../../.env')

// Verificar si existe el archivo .env
console.log('🔍 Buscando archivo .env en:', envPath)
console.log('📁 El archivo .env existe:', fs.existsSync(envPath))

// Cargar variables de entorno
const result = dotenv.config()
if (result.error) {
  console.error('❌ Error al cargar .env:', result.error)
} else {
  console.log('✅ Archivo .env cargado correctamente')
}

const createConnection = async () => {
  try {
    // Mostrar información de configuración (sin exponer la contraseña)
    const config = {
      host: 'autorack.proxy.rlwy.net',
      port: 11702,
      user: 'root',
      database: 'railway',
      password_length: process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD.length : 0
    }
    
    console.log('⚙️ Configuración de conexión:', config)
    console.log('🔑 Variables de entorno disponibles:', {
      MYSQL_PASSWORD_EXISTS: !!process.env.MYSQL_PASSWORD,
      MYSQL_PASSWORD_LENGTH: process.env.MYSQL_PASSWORD?.length || 0
    })

    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: process.env.MYSQL_PASSWORD,
      database: config.database
    })
    
    console.log('✅ Conexión exitosa a la base de datos de Railway')
    return connection
  } catch (error) {
    console.error('❌ Error al conectar con la base de datos:', error.message)
    console.error('📝 Stack trace completo:', error)
    throw error
  }
}

export default createConnection