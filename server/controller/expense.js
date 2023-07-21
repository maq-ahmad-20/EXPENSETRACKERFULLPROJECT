const express = require('express');

const Expense = require('../model/expense');

const User = require('../model/user');
const sequelize = require('../util/db');
const AWS = require('aws-sdk');
const Download = require('../model/download')



function uploadToAwsS3(data, fileName) {

    const BUCKET_NAME = process.env.BUCKET_NAME;
    const IAM_USER_KEY = process.env.IAM_USER_KEY;
    const IAM_USER_SECRET = process.env.IAM_USER_SECRET;

    let awsS3Bucket = new AWS.S3({
        accessKeyId: IAM_USER_KEY,
        secretAccessKey: IAM_USER_SECRET,

    })


    var params = {
        Bucket: BUCKET_NAME,
        Key: fileName,
        Body: data,
        ACL: 'public-read'

    }
    return new Promise((resolve, reject) => {
        awsS3Bucket.upload(params, (err, response) => {
            if (err) {
                console.log("Something Went Wrong !!")
                reject(err);

            } else {
                console.log('success', response)
                resolve(response.Location);
            }
        })

    })


}



exports.downloadUserExpenses = async (req, res, next) => {
    try {

        const expenses = await req.user.getExpenses()      // or use findall on expenses passing foreign key from req.user
        console.log(expenses);

        const stringExpenses = JSON.stringify(expenses);
        const userid = req.user.userid;
        const fileName = `expenses${userid}/${new Date()}.txt`;
        const fileUrl = await uploadToAwsS3(stringExpenses, fileName)

        const saveUrltoDB = await req.user.createDownload({ fileurl: fileUrl })



        res.status(200).json({ fileUrl, success: true })


    } catch (err) {
        console.log(err)
        res.status(500).json({ fileUrl: "", success: false })
    }
}

exports.addExpense = async (req, res, next) => {

    const transaction = await sequelize.transaction();

    try {

        const { expense, description, item, expenseamount, date } = req.body
        // console.log(req.body)

        let updateAmount = req.user.totalexpense + Number(expenseamount);
        console.log(updateAmount)

        let udpateusertotalexpense = await User.update(
            { totalexpense: updateAmount }, { where: { userid: req.user.userid } }, { transaction: transaction }
        )

        let response = await req.user.createExpense({
            expense: expense,
            description: description,
            item: item,
            date: date
        },
            { transaction: transaction }


        )
        await transaction.commit();
        let data = response['dataValues']; // coz response id object with datavalues inside expense
        console.log(response) // log it for refference
        console.log(data)
        return res.json({ InsertedData: { data } })

    } catch {
        async (err) => {

            await transaction.rollback();

            console.log(err)
        }
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
    const transaction = await sequelize.transaction();
    try {

        let id = +req.params.userid

        console.log(req.params)

        let expense = await Expense.findByPk(id);
        await User.update({ totalexpense: req.user.totalexpense - Number(expense.expense) }, { where: { userid: req.user.userid } }
            , { transaction: transaction }
        );

        await Expense.destroy({ where: { id: id } }, { transaction: transaction })

        await transaction.commit()
        res.json({ success: true })


    } catch {

        (err) => {
            transaction.rollback()
            console.log(err)
        }
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


exports.getAllDownloadedFileUrls = async (req, res, next) => {

    try {

        let id = req.user.userid;
        console.log(id)

        let downloadedData = await Download.findAll({ where: { userUserid: id } })

        res.status(200).json({ allData: downloadedData })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: 'false' })
    }
}