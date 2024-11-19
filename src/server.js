// src/server.js
import express from 'express'
import bcrypt from 'bcrypt'
import path from 'path'
import { fileURLToPath } from 'url'
import createConnection from './config/database.js'

// Configuración de __dirname para ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../public')))

// Ruta para el login
app.post('/api/login', async (req, res) => {
    let connection;
    try {
        const { username, password } = req.body
        
        connection = await createConnection()
        const [users] = await connection.query('SELECT * FROM users WHERE username = ?', [username])
        
        if (users.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado' })
        }

        const user = users[0]
        const validPassword = await bcrypt.compare(password, user.password)
        
        if (!validPassword) {
            return res.status(401).json({ error: 'Contraseña incorrecta' })
        }

        res.json({ 
            success: true, 
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        console.error('Error en login:', error)
        res.status(500).json({ error: 'Error en el servidor' })
    } finally {
        if (connection) await connection.end()
    }
})

// Listar todas las tablas
app.get('/api/tables', async (req, res) => {
    let connection;
    try {
        connection = await createConnection()
        const [rows] = await connection.query('SHOW TABLES')
        const tables = rows.map(row => Object.values(row)[0])
        res.json({ tables })
    } catch (error) {
        console.error('Error al obtener tablas:', error)
        res.status(500).json({ error: 'Error al obtener tablas' })
    } finally {
        if (connection) await connection.end()
    }
})

// Obtener estructura de una tabla
app.get('/api/tables/:table/structure', async (req, res) => {
    let connection;
    try {
        connection = await createConnection()
        const [structure] = await connection.query('DESCRIBE ??', [req.params.table])
        res.json({ structure })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        if (connection) await connection.end()
    }
})

// Obtener datos de una tabla
app.get('/api/tables/:table/data', async (req, res) => {
    let connection;
    try {
        connection = await createConnection()
        const [records] = await connection.query('SELECT * FROM ??', [req.params.table])
        res.json({ records })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        if (connection) await connection.end()
    }
})

// Insertar registro
app.post('/api/tables/:table/data', async (req, res) => {
    let connection;
    try {
        connection = await createConnection()
        const [result] = await connection.query('INSERT INTO ?? SET ?', [req.params.table, req.body])
        res.json({ 
            success: true,
            message: 'Registro creado exitosamente',
            id: result.insertId 
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        if (connection) await connection.end()
    }
})

// Actualizar registro
app.put('/api/tables/:table/data/:id', async (req, res) => {
    let connection;
    try {
        connection = await createConnection()
        await connection.query('UPDATE ?? SET ? WHERE id = ?', [req.params.table, req.body, req.params.id])
        res.json({ 
            success: true,
            message: 'Registro actualizado exitosamente'
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        if (connection) await connection.end()
    }
})

// Eliminar registro
app.delete('/api/tables/:table/data/:id', async (req, res) => {
    let connection;
    try {
        connection = await createConnection()
        await connection.query('DELETE FROM ?? WHERE id = ?', [req.params.table, req.params.id])
        res.json({ 
            success: true,
            message: 'Registro eliminado exitosamente'
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        if (connection) await connection.end()
    }
})

// Buscar registros en una tabla
app.get('/api/tables/:table/search', async (req, res) => {
    let connection;
    try {
        connection = await createConnection()
        const { field, value } = req.query
        const [records] = await connection.query(
            'SELECT * FROM ?? WHERE ?? LIKE ?',
            [req.params.table, field, `%${value}%`]
        )
        res.json({ records })
    } catch (error) {
        res.status(500).json({ error: error.message })
    } finally {
        if (connection) await connection.end()
    }
})

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../public/index.html'))
})

// Iniciar servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
    console.log(`📂 Archivos estáticos servidos desde: ${path.join(__dirname, '../public')}`)
})