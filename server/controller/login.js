


const User = require('../model/user');


exports.postloginuser = async (req, res, next) => {

    res.send({ requestedBody: req.body })
}