const jwt = require('jsonwebtoken')
require('dotenv').config();
const { promisify } = require('util')

// Efetuando a validação do JWT:
async function verifyToken(req, res, next){
    const secret = process.env.SECRET_KEY
    const bearerHeader = req.headers['authorization'];
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    
    if(!bearerToken){
        return res.status(403).json({ msg: "Erro Token inválido!"}); 
    }

    try{
        const decoded = await promisify(jwt.verify)(bearerToken, secret);
        req.userId = decoded.id;
        return next();
    }catch(err){
        return res.status(403).json({ msg: "Erro Token inválido!"});
    }
};

module.exports = verifyToken;