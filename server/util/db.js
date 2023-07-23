const Sequelize = require('sequelize');

const sequelize = new Sequelize('expensetracker', 'root', 'M1q2ool@hmad', { dialect: 'mysql', host: 'localhost' })



module.exports = sequelize;

