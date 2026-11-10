const mongoose = require('mongoose');

const productosSchema = mongoose.Schema({
    nombre: {
      type: String,
      required: true
    }
    ,
    precio: {
      type: Number,
      required: true
    }
    ,
    descripcion: {
      type: String,
      required: true
    }
    ,
    imagen: {
      type: String,
      required: true
    }
    ,
    categoria: {
      type: String,
      required: true,
      enum: ['Postres', 'Helados', 'Ensalada de frutas']
    }
    ,
    disponibilidad: {
      type: Boolean,
      default: true
    }

});

module.exports = mongoose.model('productos', productosSchema);