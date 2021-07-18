const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projectReact', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

/*sequelize.authenticate().then(function(){

  console.log("conexão ok");

}).catch(function(err){
  console.log("Error na conexão");
});*/

module.exports = sequelize;
