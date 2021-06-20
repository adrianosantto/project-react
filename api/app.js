const express = require('express')
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(express.json());

app.get('/usuarios', function (req, res) {
  res.json({
    erro: false,
    messagem: "Listar Usuários!"
  });
});

app.post('/login', function (req, res) {
  //console.log(req.body.senha);
  if (req.body.usuario === 'Lunasantto@gmail.com' && req.body.senha=== '123456') {
    const{id} = 1;
    var privateKey = process.env.SECRET;
    var token = jwt.sign({id}, privateKey,{
      //espirar(expiresIn) em 10 min
      expiresIn:600
    })
    res.json({
      erro: false,
      messagem: "Login válido!",
      token
    });

  }
  res.json({
    erro: true,
    messagem: "Login incorreto"
  });
});
 
app.listen(8080, function(){
  console.log("servidor porta 8080: http://localhost:8080/");
});