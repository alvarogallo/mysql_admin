const mysql = require('mysql2');

// Crear conexión usando las variables de entorno de Railway
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
});

// Intentar conectar
connection.connect((err) => {
    if (err) {
        console.error('❌ Conexión fallida:', err.message);
        process.exit(1); // Salir con error
    } else {
        console.log('✅ Conexión exitosa');
        process.exit(0); // Salir con éxito
    }
});