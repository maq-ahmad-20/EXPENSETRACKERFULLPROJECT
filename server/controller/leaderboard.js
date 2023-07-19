const path = require('path')

const User = require('../model/user');
const Expense = require('../model/expense')



exports.getAllExpensesOfUSers = async (req, res, next) => {

    try {
        let expenses = await Expense.findAll();

        let users = await User.findAll();
        let aggregateData = {};

        expenses.forEach(expense => {
            //console.log(expense)
            console.log(expense.dataValues.userUserid)
            if (aggregateData[expense.dataValues.userUserid]) {
                aggregateData[expense.dataValues.userUserid] = aggregateData[expense.userUserid] + expense.expense;
            } else {
                aggregateData[expense.dataValues.userUserid] = expense.expense;
            }
        });

        var userBoardDetais = [];

        users.forEach(user => {
            userBoardDetais.push({ name: user.username, totalexpense: aggregateData[user.userid] })
        })

        console.log(userBoardDetais)

        res.status(201).json(userBoardDetais);

    } catch (err) {
        console.log(err)
    }


}