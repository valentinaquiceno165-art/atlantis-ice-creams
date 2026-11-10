const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    mensaje: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('formulario', Schema)