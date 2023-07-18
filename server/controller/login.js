
var globalMailId = "";

const User = require('../model/user');

const bcrypt = require('bcrypt')

const path = require('path')
const jwt = require('jsonwebtoken')


function genereteAcessToken(id) {
    return jwt.sign({ userid: id }, 'my_secret_key')
}


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


            console.log(response)

            res.status(200).json({
                data: {
                    "successfullylogged": true,
                    "token": genereteAcessToken(useremailexistinDb.dataValues.userid)
                }
            })
        } else {


            res.status(401).json({ data: "User not authorized" })

        }


    })


}


exports.mailID = globalMailId
module.exports.genretareAccessToken = genereteAcessToken 
