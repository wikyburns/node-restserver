const express = require('express');
const { verificarToken, verificaAdmin_Role } = require('../middlewares/authentication');
const app = express();
const Categoria = require('../models/categoria');
const _ = require('underscore');

app.get('/categorias', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({ estado: true })
        .sort('nombre')
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Categoria.countDocuments({ estado: true }, (err, count) => {
                res.json({
                    ok: true,
                    count,
                    categorias
                });
            });
        });
});


//Obtener categoria
app.get('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id)
        .populate('usuario', 'nombre email')
        .exec((err, categoriaDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria: categoriaDB
            });
        });
});


// Nueva categoría
app.post('/categoria', verificarToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        nombre: body.nombre,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
            return;
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


//Actualizar categoría
app.put('/categoria/:id', verificarToken, (req, res) => {

    let body = _.pick(req.body, ['nombre']);

    let id = req.params.id;

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


//Borrar categoria
app.delete('/categoria/:id', [verificarToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndDelete(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoría no encontrada"
                }
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});


module.exports = app;