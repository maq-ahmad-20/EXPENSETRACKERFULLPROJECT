const express = require('express');
const expenseControl = require('../controller/expense')

const userAuth = require('../autuntication/auth')

const router = express.Router();



router.get('/getExpense/:userid', userAuth.authentiateUser, expenseControl.getSingleUserExpense);
router.get('/getAllExpense', userAuth.authentiateUser, expenseControl.getAllExpense);



router.post('/addexpense', userAuth.authentiateUser, expenseControl.addExpense)

router.delete('/deleteuserexpense/:userid', userAuth.authentiateUser, expenseControl.deleteUserExpense)

//router.put('/expensechange', expenseControl.editUser)


module.exports = router;