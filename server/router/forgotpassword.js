const express = require('express');
const forgotpassControler = require('../controller/forgetpassword')

const router = express.Router();


router.post('/forgotpassword', forgotpassControler.sendResetPasswordMail)


module.exports = router;