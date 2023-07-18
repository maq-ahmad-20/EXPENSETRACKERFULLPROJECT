const express = require('express');

const Expense = require('../model/expense');

const User = require('../model/user')

exports.addExpense = (req, res, next) => {

    const { expense, description, item } = req.body
    // console.log(req.body)


    req.user.createExpense({
        expense: expense,
        description: description,
        item: item

    }).then((response) => {
        let data = response['dataValues']; // coz response id object with datavalues inside expense
        console.log(response) // log it for refference
        console.log(data)
        return res.json({ InsertedData: { data } })
    })

}


exports.getAllExpense = (req, res, next) => {

    console.log(req.user.userid)
    Expense.findAll({ where: { userUserid: req.user.userid } }).then((usersexpenses) => { //useruserid is foregnkey
        //console.log(users)

        return res.json({ alldata: usersexpenses }) // sent users as arrays so we can parse in FE dont send stringifying as json send arrays as json obj

    }).catch(err => console.log(err))

}


exports.deleteUser = (req, res, next) => {
    let id = +req.params.userid
    console.log(req.params)
    Expense.findByPk(id)
        .then((response) => {
            return response.destroy({ where: { userUserid: req.user.userid, userid: id } });
        }).then((result) => {
            //console.log(result)

            res.json({ success: true })
        })

}


exports.getSingleUser = (req, res, next) => {

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