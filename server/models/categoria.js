const mongoose = require('mongoose');

let { verificarToken } = require('../middlewares/authentication');


let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre de la categoria']
    },
    estado: {
        type: Boolean,
        default: true
    },
    usuario: {
        type: String
    }
});

module.exports = mongoose.model('Categoria', categoriaSchema);