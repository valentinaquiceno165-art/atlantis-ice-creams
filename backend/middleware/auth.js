const jwt = require('jsonwebtoken');

function verificarAdmin(req, res, next) {

    //consulta el token por la cookie q envia al navegador
    const token = req.cookies.token;

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