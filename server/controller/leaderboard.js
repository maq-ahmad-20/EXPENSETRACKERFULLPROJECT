const path = require('path')

const User = require('../model/user');
const Expense = require('../model/expense');
const sequelize = require('../util/db');




exports.getAllExpensesOfUSers = async (req, res, next) => {

    try {


        let userAggregatedata = await User.findAll({
            attributes: ['userid', 'username', [sequelize.fn('sum', sequelize.col('users.totalexpense')), 'total_cost']],
            include: [
                {
                    model: Expense,
                    attributes: []
                }
            ],
            group: ['users.userid'],
            order: [['total_cost', 'DESC']]
        });
        console.log(userAggregatedata)




        res.status(201).json(userAggregatedata);

    } catch (err) {
        console.log(err)
    }


}


