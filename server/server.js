require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


app.use(require('./routes/user'));

mongoose.connect(process.env.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;
    console.log('Conectado a MongoDB');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto', process.env.PORT);
});