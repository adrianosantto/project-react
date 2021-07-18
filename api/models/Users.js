const Sequelize = require('sequelize');
const db = require('./db');

const User = db.define('users', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    allowNull: false,
    primaryKey:true
  },
  nome:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  email:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  pass: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

User.sync();

module.exports = User;
