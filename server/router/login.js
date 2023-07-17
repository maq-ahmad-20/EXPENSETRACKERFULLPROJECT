const express = require('express');
const loginControl = require('../controller/login')


const router = express.Router();

router.post('/login', loginControl.postloginuser)


module.exports = router;