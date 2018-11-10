//================
// Puerto
//================
process.env.PORT = process.env.PORT || 3000;


//================
// Entorno
//================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//================
// Data Base
//================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/wikyburns';
} else {
    urlDB = 'mongodb://wikyzero:Hijodeperra,m3m5@ds159073.mlab.com:59073/wikyburns';

}

process.env.urlDB = urlDB;