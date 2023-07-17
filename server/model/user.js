
const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const User = sequelize.define('users', {

    userid: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },

    useremail: {
        type: Sequelize.STRING,
        allowNull: false
    },

    userphonenumber: {
        type: Sequelize.INTEGER,
        allowNull: false
    },


    userpassword: {
        type: Sequelize.STRING,
        allowNull: true
    }





})

module.exports = User;