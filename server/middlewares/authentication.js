const jwt = require('jsonwebtoken');

//====================
// Verificar token
//====================

let verificarToken = (req, res, next) => {

    let token = req.get('token');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: "Invalid token"
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    })

};

//======================
// Verificar admin role
//======================

let verificaAdmin_Role = (req, res, next) => {

    if (req.usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            err: {
                message: "No tiene permisos de Administrador"
            }
        });
    }
}


module.exports = {
    verificarToken,
    verificaAdmin_Role
}