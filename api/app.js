const express = require('express')
const app = express();

app.get('/', function (req, res) {
  res.send('É nois queiroz!')
});
 
app.listen(8080, function(){
  console.log("servidor porta 8080: http://localhost:8080/");
});