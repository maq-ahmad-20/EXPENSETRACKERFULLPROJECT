const express = require('express');

const Expense = require('../model/expense');

const User = require('../model/user')

exports.addExpense = async (req, res, next) => {

    try {

        const { expense, description, item, expenseamount } = req.body
        // console.log(req.body)

        let updateAmount = req.user.totalexpense + Number(expenseamount);
        console.log(updateAmount)

        let udpateusertotalexpense = await User.update(
            { totalexpense: updateAmount }, { where: { userid: req.user.userid } }
        )

        let response = await req.user.createExpense({
            expense: expense,
            description: description,
            item: item


        })
        let data = response['dataValues']; // coz response id object with datavalues inside expense
        console.log(response) // log it for refference
        console.log(data)
        return res.json({ InsertedData: { data } })

    } catch (err) {
        console.log(err)
    }
}


exports.getAllExpense = (req, res, next) => {

    console.log(req.user.userid)
    Expense.findAll({ where: { userUserid: req.user.userid } }).then((usersexpenses) => { //useruserid is foregnkey
        //console.log(users)

        return res.json({ alldata: usersexpenses }) // sent users as arrays so we can parse in FE dont send stringifying as json send arrays as json obj

    }).catch(err => console.log(err))

}


exports.deleteUserExpense = async (req, res, next) => {

    try {
        let id = +req.params.userid

        console.log(req.params)

        let expense = await Expense.findByPk(id);
        await User.update({ totalexpense: req.user.totalexpense - expense.expense }, { where: { userid: req.user.userid } });

        Expense.destroy({ where: { id: id } }).then((result) => {

            res.json({ success: true })
        })

    } catch (err) {
        console.log(err)
    }
}


exports.getSingleUserExpense = (req, res, next) => {

    //console.log(req.params)
    let id = +req.params.userid;
    Expense.findByPk({ where: { userUserid: req.user.userid, userid: id } })
        .then(result => {
            console.log(result)

            return res.json({ fethchedSingleData: result })

        })


}


exports.editUser = (req, res, next) => {

    console.log(req.body)

    const { id, expense, description, item } = req.body

    Expense.findByPk(id)
        .then((record) => {
            record.update({
                expense: expense,
                description: description,
                item: item
            }).then((response) => {
                res.json({ updatedData: response })
            })
        })





}