const express = require('express');
const { verificarToken, verificaAdmin_Role } = require('../middlewares/authentication');
const app = express();
const Producto = require('../models/producto');
const _ = require('underscore');

// Crear producto
app.post('/producto', verificarToken, (req, res) => {

    let body = req.body;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: body.usuario
    });


    producto.save(producto, (err, productoDB) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
            return;
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });

});


//Get producto por ID
app.get('/producto/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto: productoDB
            });
        })


});

// Get listado de productos
app.get('/productos', verificarToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find()
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((err, prodctos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Producto.countDocuments((err, count) => {
                res.json({
                    ok: true,
                    count,
                    prodctos
                });
            });
        });
});

// Buscador
app.get('/producto/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');

    Producto.find({ nombre: regex })
        .populate('usuario', 'nombre email')
        .exec((err, productos) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                productos
            });
        });
})

//Actualizar producto
app.put('/producto/:id', verificarToken, (req, res) => {

    let body = _.pick(req.body, ['nombre']);

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, productoBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoBD
        });
    });
});


//Borrar producto
app.delete('/producto/:id', [verificarToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndDelete(id, (err, productoDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Producto no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            categoria: productoDB
        });
    });
});


module.exports = app;