require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const producto = require('./modelos/productos.js');
const Usuario = require('./modelos/usuario.js');
const formulario = require('./modelos/formulario.js');
const verificarAdmin = require('./middleware/auth.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
// Orígenes permitidos: FRONTEND_URL (admite varios separados por comas) + localhost para dev/preview
const origenesPermitidos = [
    ...(process.env.FRONTEND_URL ? process.env.FRONTEND_URL.split(',').map((o) => o.trim()) : []),
    'http://localhost:5173',
    'http://localhost:4173',
];

app.use(cors({
    origin: (origin, callback) => {
        // Sin origen (curl, Postman) o dentro de la lista permitida
        if (!origin || origenesPermitidos.includes(origin)) {
            return callback(null, true);
        }
        return callback(new Error('Origen no autorizado por CORS'));
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

const MONGODB_URI = process.env.MONGODB_URI;
const PUERTO = process.env.PORT || process.env.PUERTO || 3001;

const conectarDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅Base de datos conectada");
    } catch (error) {
        console.error('❌Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.send('Servidor Atlantis funcionando');
});

//para iniciar sesión
app.post('/login', async (req, res) => {

    const { correo, contraseña } = req.body;

    try {
        // Buscar el administrador
        const usuarioEncontrado = await Usuario.findOne({ correo });

        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Correo incorrecto'
            });
        }

        // Comprobar la contraseña
        const contraseñaCorrecta = await bcrypt.compare(
            contraseña,
            usuarioEncontrado.contraseña
        );

        if (!contraseñaCorrecta) {
            return res.status(401).json({
                mensaje: 'Contraseña incorrecta'
            });
        }

        //comprobar q sea admin
        if (usuarioEncontrado.rol !== 'admin') {
            return res.status(403).json({
                mensaje: 'No es un administrador'
            });
        }
        // Crear el token de seguridad
        const token = jwt.sign(
            { id: usuarioEncontrado._id, rol: usuarioEncontrado.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        //guardar el token en la cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 60 * 60 * 1000, // 1 hora
            path: '/'
        });

        res.json({
            mensaje: 'Inicio de sesión correcto',
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión'
        });
    }
});

//comprueba q la cookie contenga el token y sea admin
app.get('/verificar-sesion', verificarAdmin, (req, res) => {
    res.json({
        autenticado: true
    });
});

//eliminamos la cookie cuando el admin cierra sesion
app.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/'
    });
    res.json({
        mensaje: 'Sesión cerrada correctamente'
    });
});


//registra los mensajes
app.post('/formulario', async (req, res) => {

    try {
        const { nombre, correo, mensaje } = req.body;

        if (!nombre || !correo || !mensaje) {
            return res.status(400).json({
                mensaje: 'Por favor, completa todos los campos'
            });
        }

        await formulario.create({
            nombre,
            correo,
            mensaje
        })

        res.status(201).json({
            mensaje: 'Mensaje enviado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al enviar el mensaje'
        });
    }

});

//para obtener todos los mensajes en admin y que solo el admin pueda verlos
app.get('/formulario', verificarAdmin, async (req, res) => {

    try {
        const mensajes = await formulario.find();

        res.json(mensajes);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al obtener los mensajes'
        });
    }

});

//para obtener todos los productos
app.get("/productos", async (req, res) => {
    try {
        const productos = await producto.find();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo obtener los productos" });
    }
});

//para obtener un producto por id
app.get("/productos/:id", async (req, res) => {
    try {
        const productoEncontrado = await producto.findById(req.params.id);
        res.json(productoEncontrado);
    } catch (error) {
        res.status(500).json({ mensaje: "No se pudo obtener el producto" });
    }
});

//para crear un producto (protegido por token)
app.post('/productos', verificarAdmin, async (req, res) => {

    try {
        const {
            nombre,
            precio,
            descripcion,
            imagen,
            categoria,
            disponibilidad
        } = req.body;

        if (!nombre || !descripcion || !imagen ||
            precio === undefined || precio === null ||
            precio === '') {
            return res.status(400).json({
                mensaje: 'Completa todos los campos'
            });
        }

        if (!Number.isFinite(Number(precio)) || Number(precio) < 0) {
            return res.status(400).json({
                mensaje: 'Precio inválido'
            });
        }

        if (!imagen.startsWith('/') || imagen.includes('..')) {
            return res.status(400).json({
                mensaje: 'Ruta de imagen inválida'
            });
        }

        const nuevoProducto = await producto.create({
            nombre,
            precio: Number(precio),
            descripcion,
            imagen,
            categoria,
            disponibilidad: disponibilidad !== false
        });

        res.status(201).json(nuevoProducto);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al crear el producto'
        });
    }

});

//para actualizar-editar un producto por id (protegido por token)
app.put("/productos/:id", verificarAdmin, async (req, res) => {
    try {
        const actualizado = await producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                //devuelve el producto despues de actualizarlo
                new: true,

                //revisa q se cumplan las reglas del modelo de MongoDB
                runValidators: true
            }
        );

        if (!actualizado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }

        res.json(actualizado);

    } catch (error) {
        res.status(400).json({
            mensaje: 'No se pudo actualizar el producto'
        });
    }
});

//para eliminar un producto por id (protegido por token)
app.delete("/productos/:id", verificarAdmin, async (req, res) => {
    try {
        const eliminado = await producto.findByIdAndDelete(req.params.id);

        if (!eliminado) {
            return res.status(404).json({
                mensaje: 'Producto no encontrado'
            });
        }
        res.json({
            mensaje: 'Producto eliminado'
        });
    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el producto'
        });
    }
});

//evitar q reciba peticiones el servidor antes de q la base de datos este conectada
const iniciarServidor = async () => {
    try {
        await conectarDB();
        app.listen(PUERTO, () => {
            console.log('Servidor funcionando en http://localhost:' + PUERTO);
        });
    } catch (error) {
        console.log('Error al conectar la base de datos:', error);
    }
};

iniciarServidor();
