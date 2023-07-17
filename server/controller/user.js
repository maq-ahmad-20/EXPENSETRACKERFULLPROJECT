
const express = require('express');

const User = require('../model/user');

const bcrypt = require('bcrypt')

exports.postUser = async (req, res, next) => {

    try {


        const { username, useremail, userphonenumber, userpassword } = req.body;

        let findIfmailExits = await User.findOne({ where: { useremail: useremail } });

        if (findIfmailExits) {
            return res.status(400).json({ success: false });
        }

        let saltedround = 10;
        bcrypt.hash(userpassword, saltedround, async (err, hash) => {


            let createdUser = await User.create({
                username: username,
                useremail: useremail,
                userphonenumber: userphonenumber,
                userpassword: hash
            })

            let data = createdUser['dataValues'];
            console.log(createdUser)
            console.log(data)
            return res.status(201).json({ message: 'successfullyusercreated' })




        })


    } catch (err) {
        res.status(500).json(err);
    }
}