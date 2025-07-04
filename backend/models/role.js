const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
});

module.exports = Role;
