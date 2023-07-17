


const User = require('../model/user');


exports.postloginuser = async (req, res, next) => {

    const { useremail, userpassword } = req.body;

    let useremailexistinDb = await User.findOne({ where: { useremail: useremail } })

    if (!useremailexistinDb) {
        return res.status(404).send({ data: "User not found" })
    }

    // console.log(useremailexistinDb)
    // console.log(useremailexistinDb.dataValues.userpassword);
    // console.log(userpassword)
    if (useremailexistinDb.dataValues.userpassword.length != userpassword && useremailexistinDb.dataValues.userpassword != userpassword) {
        return res.status(401).send({ data: "User not authorized" })
    }

    return res.status(200).send({ successfullylogged: true })

}