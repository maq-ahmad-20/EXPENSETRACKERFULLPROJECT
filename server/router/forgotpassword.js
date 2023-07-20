const express = require('express');
const forgotpassControler = require('../controller/forgetpassword')

const router = express.Router();


router.get('/resetForgotPassword/:requestId', forgotpassControler.showPasswordChangePage)

router.post('/forgotpassword', forgotpassControler.sendResetPasswordMail)

router.put('/updatePassword', forgotpassControler.updatePassword)


module.exports = router;