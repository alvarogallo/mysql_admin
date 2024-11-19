// Lee la variable de entorno MYSQLPASSWORD
const mysqlPassword = process.env.MYSQLPASSWORD;

// Verifica si está definida
if (!mysqlPassword) {
    console.error('❌ La variable de entorno MYSQLPASSWORD no está definida.');
    process.exit(1); // Salir con error
} else {
    console.log(`✅ MYSQLPASSWORD está definido como: "${mysqlPassword}"`);
    process.exit(0); // Salir con éxito
}
