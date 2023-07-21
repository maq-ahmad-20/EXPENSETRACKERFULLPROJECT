
const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Expense = sequelize.define('expense', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    expense: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    item: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date: {
        type: Sequelize.STRING,
        allowNull: true,
    }

})

module.exports = Expense;