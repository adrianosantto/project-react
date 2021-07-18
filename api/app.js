const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const cors = require('cors');
const {eAdmin} = require('./middlewares/auth');
const Users = require('./models/Users');
const User = require('./models/Users');

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
});
// teste de conexão "const db = require("./models/db");"



app.get('/usuarios', eAdmin, function (req, res) {
  return res.json({
    erro: false,
    messagem: "Listar Usuários!"
  });
});

app.post('/usuarios', async (req, res) => {

var dados = req.body;

dados.pass = await bcrypt.hash(dados.pass, 8)

await User.create(dados).then(function(){

  return res.json({
    erro: false,
    messagem: "OK"
  });

}).catch(function(){
  return res.json({
    erro: true,
    messagem: "Usuario incorreto"
    });
  });
});

/*return res.json ({
  dados: req.body
  });
});*/

app.post('/login', function (req, res) {
//falata validar o usuário 32.50 mts

  //console.log(req.body.senha);
  if (req.body.usuario === 'Lunasantto@gmail.com' && req.body.senha=== '123456') {
    const{id} = 1;
    var privateKey = process.env.SECRET;
    var token = jwt.sign({id}, privateKey,{
      //espirar(expiresIn) em 10 min
      //expiresIn:600
      expiresIn:'7d' //7 dias
    })
    return res.json({
      erro: false,
      messagem: "Login válido!",
      token
    });

  }
  return res.json({
    erro: true,
    messagem: "Login incorreto"
  });
});

app.listen(8080, function(){
  console.log("servidor porta 8080: http://localhost:8080/");
});