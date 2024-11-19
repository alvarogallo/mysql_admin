// src/config/users.js
import createConnection from './database.js'

const createUsersTable = async () => {
  let connection;
  try {
    connection = await createConnection()
    
    // Verificar si la tabla existe
    const [tables] = await connection.query(`
      SELECT TABLE_NAME 
      FROM information_schema.TABLES 
      WHERE TABLE_NAME = 'users'
    `)
    
    if (tables.length === 0) {
      // Si no existe, crear la tabla
      await connection.query(`
        CREATE TABLE users (
          id INT AUTO_INCREMENT PRIMARY KEY,
          username VARCHAR(50) NOT NULL UNIQUE,
          password VARCHAR(255) NOT NULL,
          email VARCHAR(100) UNIQUE,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          last_login TIMESTAMP NULL,
          is_active BOOLEAN DEFAULT true,
          role ENUM('admin', 'user') DEFAULT 'user'
        )
      `)
      console.log('✅ Tabla users creada exitosamente')
    } else {
      console.log('ℹ️ La tabla users ya existe')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
    throw error
  } finally {
    if (connection) {
      await connection.end()
    }
  }
}

export default createUsersTable