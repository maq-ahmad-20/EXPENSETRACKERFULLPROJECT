
var globalMailId = "";

const User = require('../model/user');

const bcrypt = require('bcrypt')

const path = require('path')

exports.postloginuser = async (req, res, next) => {

    const { useremail, userpassword } = req.body;

    let useremailexistinDb = await User.findOne({ where: { useremail: useremail } })

    console.log(useremailexistinDb)

    if (!useremailexistinDb) {
        return res.status(404).json({ data: "User not found" })
    }


    bcrypt.compare(userpassword, useremailexistinDb.dataValues.userpassword, (err, response) => {


        if (err) {
            return res.status(500).json({ message: "something went wrong" })

        }

        if (response) {

            //res.redirect('http://127.0.0.1:5500/FrontEnd/expensespage/expense.html')
            globalMailId = useremail;

            res.status(200).json({ successfullylogged: true })
        } else {


            res.status(401).json({ data: "User not authorized" })

        }


    })


}


exports.mailID = globalMailId
