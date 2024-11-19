// Lee la variable de entorno MYSQLHOST
const mysqlHost = process.env.MYSQLHOST;

// Verifica si está definida
if (!mysqlHost) {
    console.error('❌ La variable de entorno MYSQLHOST no está definida.');
    process.exit(1); // Salir con error
} else {
    console.log(`✅ MYSQLHOST está definido como: ${mysqlHost}`);
    process.exit(0); // Salir con éxito
}
