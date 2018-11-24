const express = require('express');
const { verificarToken, vertificaTokenUrl } = require('../middlewares/authentication')
const fs = require('fs');
const path = require('path');
let app = express();

app.get('/imagen/:tipo/:img', vertificaTokenUrl, (req, res) => {

    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ img }`);

    if (fs.existsSync(pathImagen)) {
        res.sendFile(pathImagen);
    } else {
        let noImgPath = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(noImgPath);
    }

});


module.exports = app;