import mysql from 'mysql2';

// Verifica que las variables de entorno estén configuradas
const requiredEnvVars = [
    'MYSQLHOST',
    'MYSQLUSER',
    'MYSQLPASSWORD',
    'MYSQLDATABASE',
    'MYSQLPORT',
];

for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
        console.error(`❌ Faltante: la variable de entorno ${varName} no está configurada.`);
        process.exit(1); // Salir con error si falta una variable
    }
}

// Crear conexión usando las variables de entorno
const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: parseInt(process.env.MYSQLPORT, 10),
});

// Intentar conectar
connection.connect((err) => {
    if (err) {
        console.error('❌ Conexión fallida:', err.message);
        process.exit(1);
    } else {
        console.log('✅ Conexión exitosa');
        process.exit(0);
    }
});
