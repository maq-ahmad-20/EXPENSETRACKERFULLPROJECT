const express = require('express');
const loginControl = require('../controller/login')

const userAuth = require('../autuntication/auth')

const router = express.Router();


router.get('/checkpremieruser', userAuth.authentiateUser, loginControl.checkPremierUser)

router.post('/login', loginControl.postloginuser)


module.exports = router;