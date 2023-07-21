const path = require('path');
const Expense = require("../model/expense");

const { Sequelize, Op } = require("sequelize");


exports.reportsOfDay = async (req, res, next) => {

    try {
        const date = req.body.date;
        console.log(date);
        const expenses = await Expense.findAll({
            where: { date: date, userUserid: req.user.userid },
        });

        console.log(expenses)
        return res.status(200).send(expenses);


    } catch (err) {
        console.log(err)
    }
}


exports.reportsOfMonth = async (req, res, next) => {

    try {
        const month = req.body.month;

        let monthlyData = await Expense.findAll({
            where: {
                date: { [Op.like]: `%-${month}%` },
                userUserid: req.user.userid
            }
        })

        console.log(monthlyData);
        return res.status(200).send(monthlyData)


    } catch (err) {
        console.log(err)
    }

}

exports.reportsOfYear = async (req, res, next) => {

    try {
        const year = req.body.year;

        let yearlyData = await Expense.findAll({
            where: {
                date: { [Op.like]: `%-${year}%` },
                userUserid: req.user.userid
            }
        })

        console.log(yearlyData);
        return res.status(200).send(yearlyData)


    } catch (err) {
        console.log(err)
    }

}