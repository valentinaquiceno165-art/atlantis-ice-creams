const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    correo: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
   contraseña: {
        type: String,
        required: true
    },
    rol: {
        type: String,
        required: true,
        default: 'admin'
    }
})

module.exports = mongoose.model('Usuario', Schema)