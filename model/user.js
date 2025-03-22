const { Sequelize, DataTypes } = require('sequelize');
const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD } = process.env;
// Connect to the database
const sequelize = new Sequelize('postgres://DB_USERNAME:DB_PASSWORD@DB_HOST:DB_PORT/graphql_crud');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = User;
