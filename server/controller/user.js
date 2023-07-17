
const express = require('express');

const User = require('../model/user');

exports.postUser = async (req, res, next) => {

    const { username, useremail, userphonenumber, userpassword } = req.body;

    let findIfmailExits = await User.findOne({ where: { useremail: useremail } });

    if (!findIfmailExits) {
        let createdUser = await User.create({
            username: username,
            useremail: useremail,
            userphonenumber: userphonenumber,
            userpassword: userpassword
        })

        let data = createdUser['dataValues'];
        console.log(createdUser)
        console.log(data)
        return res.json({ InsertedData: { data } })
    }

    return res.json({ success: false })

}