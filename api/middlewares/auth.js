const jwt = require('jsonwebtoken');
const {promisify} = require('util');
require ('dotenv').config();

module.exports = {
  eAdmin: //verificar se o token é valido
  async function (req, res, next){
     
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(' ');
    
    if(!token){
      return res.json({
        erro: true, messagem: "Erro: Necessário realizar login!"
      });

    }
    try{
     const decode = await promisify(jwt.verify)(token, process.env.SECRET);
      req.userId = decode.id;
      return next();
    }
    catch(err){
      return res.json({
        erro: true, messagem: "Erro: Login ou Senha invalido!"
      });

    }
    
  }
}