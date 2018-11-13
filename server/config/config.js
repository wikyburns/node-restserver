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
process.env.CADUCIDAD_TOKEN = '48h';

//========================
// SEED de autenticacion
// =======================
process.env.SEED = process.env.SEED || 'secret-de-desarrollo';

//==================
// Google client_id
//===================
process.env.CLIENT_ID = process.env.CLIENT_ID || '941056571365-0i21nsn641edaq8bbc720colqoq712ls.apps.googleusercontent.com';

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