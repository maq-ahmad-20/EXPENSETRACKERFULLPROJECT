const express = require('express');
const userControl = require('../controller/user')

const router = express.Router();



router.post('/signup', userControl.postUser)



module.exports = router;