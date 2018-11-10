const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();

app.get('/user', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    status: false,
                    err
                })
            }

            Usuario.countDocuments({ estado: true }, (err, count) => {
                res.json({
                    status: true,
                    count,
                    usuarios
                });
            });


        });
});


app.post('/user', function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
            return;
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    })

});


app.put('/user/:id', function(req, res) {

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});


app.delete('/user/:id', function(req, res) {

    let id = req.params.id;
    let cambiaEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});





// BORRAR DEL TODO
// app.delete('/user/:id', function(req, res) {

//     let id = req.params.id;

//     Usuario.findByIdAndDelete(id, (err, usuarioDB) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             })
//         }

//         if (!usuarioDB) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: "Usuario no encontrado"
//                 }
//             })
//         }

//         res.json({
//             ok: true,
//             usuario: usuarioDB
//         })
//     })

// });




module.exports = app;