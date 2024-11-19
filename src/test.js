// test.js
import mysql from 'mysql2/promise'

// Imprimir todas las variables de entorno disponibles (sin las credenciales)
console.log('Variables de entorno disponibles:')
Object.keys(process.env).forEach(key => {
  console.log(`${key}: ${key.includes('PASSWORD') ? '[HIDDEN]' : process.env[key]}`)
})

const config = {
  host: 'autorack.proxy.rlwy.net',  // Host fijo de Railway
  port: 11702,                      // Puerto fijo de Railway
  user: 'root',
  password: 'fIMIPIsVpwbKUVKkJRNWxidyxxkCowSW',
  database: 'railway'
}

console.log('\nIntentando conectar con configuración:')
console.log({
  ...config,
  password: '[HIDDEN]'
})

async function testConnection() {
  try {
    const connection = await mysql.createConnection(config)
    console.log('\n✅ Conexión exitosa a la base de datos')
    
    // Probar una consulta simple
    const [rows] = await connection.execute('SELECT 1 + 1 as result')
    console.log('\nPrueba de consulta:', rows[0].result)
    
    await connection.end()
  } catch (error) {
    console.error('\n❌ Error de conexión:', error)
  }
}

testConnection()