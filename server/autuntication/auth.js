const jwt = require("jsonwebtoken");
const User = require("../model/user");

module.exports.authentiateUser = (req, res, next) => {
    try {
        const token = req.header("Authorization");
        const usertoken = jwt.verify(token, 'my_secret_key');
        console.log(usertoken) //{userid:1 , iat:value}
        User.findByPk(usertoken.userid).then((user) => {
            req.user = user;
            next();
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false });
    }
};


