const jwt = require('jsonwebtoken');

function verificarAdmin(req, res, next) {

    //toma el segundo elemento(token) despues del espacio
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            mensaje: 'Debes iniciar sesión'
        });
    }

    try {
        const usuario = jwt.verify(token, process.env.JWT_SECRET);

        if (usuario.rol !== 'admin') {
            return res.status(403).json({
                mensaje: 'No tienes permiso para acceder'
            });
        }

        //guarda los datos del usuario en req.usuario
        req.usuario = usuario;

        //si el usuario es admin, continuar
        next();

    } catch (error) {
        return res.status(401).json({
            mensaje: 'Sesión inválida'
        });
    }
}

module.exports = verificarAdmin;