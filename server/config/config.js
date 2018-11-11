//================
// Puerto
//================
process.env.PORT = process.env.PORT || 3000;

//================
// Entorno
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//========================
// Vencimiento de token
//========================
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//========================
// SEED de autenticacion
// =======================
process.env.SEED = process.env.SEED || 'secret-de-desarrollo';

//================
// Data Base
//================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/wikyburns';
} else {
    urlDB = process.env.MONGO_URL;
}

process.env.urlDB = urlDB;