const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcrypt');
require('dotenv').config();
const cors = require('cors');
const {eAdmin} = require('./middlewares/auth');
const Usuario = require('./models/Users');
//const { where } = require('sequelize/types');


app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
  app.use(cors());
  next();
});

//56 minutos

app.get('/usuarios', eAdmin, async function(req, res){
  await Usuario.findAll({order: [['id', 'DESC']]}).then(function(usuarios){
      return res.json({
        erro: false,
        usuarios
    });
  }).catch(function(){
    return res.json({
      erro: true,
      messagem: "usuário não encontrado"
    });
  });
});
app.get('/usuario/:id', eAdmin, async(req,res) =>{
 await Usuario.findByPk(req.params.id).then(usuario =>{
  return res.json({
    erro: false,
    usuario
  });

 }).catch(function(){
  return res.json({
    erro: true,
    messagem: "usuário não encontrado"
  });
 });
});

app.post('/usuario', async (req, res) => {
  var dados = req.body;
  dados.pass = await bcrypt.hash(dados.pass, 8);


  await Usuario.create(dados).then(function(){
    return res.json({
      erro: false,
      messagem: "usuário cadastrado"
    });

  }).catch(function(){
    return res.json({
      erro: true,
      messagem: "usuário nao foi cadastrado"
    });

  });
});
app.put('/usuario', eAdmin, async (req, res)=>{
  var dados = req.body;
  dados.pass = await bcrypt.hash(dados.pass,8);

  await Usuario.update(dados, {where: {id: dados.id}}).then(function(){
      return res.json({
      erro: false,
      messagem: "Usuário editado com sucesso"
    });
  }).catch(function(){
    return res.json({
      erro: true,
      messagem: "Não foi possível editar o Usuário"
      });
    });
  });

  app.delete('/usuario/:id',eAdmin, async (req, res) => {
    await Usuario.destroy({where: {id: req.params.id}}).then(function(){
      return res.json({
        erro: false,
        messagem: "Usuário exluido com sucesso"
        });
    }).catch(function(){

      return res.json({
        erro: true,
        messagem: "Não conseguimos exluir o usuário"
        });
     });
  });

app.post('/login', async (req, res) => {
  //console.log(req.body);

  const usuario = await Usuario.findOne({where: {email: req.body.usuario}});
  if (usuario === null){

    return res.json({
      erro: true,
      messagem: "Usuario ou senha incorretos."
    });
  }
  if(!(await bcrypt.compare(req.body.pass, usuario.pass))){
    return res.json({
      erro: true,
      messagem: "Usuário ou senha estão Incorretos."
    });
  }
    var token = jwt.sign({id: usuario.id}, process.env.SECRET, {
     expiresIn: '7d'

    });
    return res.json({
      erro: false,
      messagem: "login sucesso!",
      token
    });
});

app.listen(8080, function(){
  console.log("servidor porta 8080: http://localhost:8080");
});