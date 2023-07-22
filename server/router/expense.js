const express = require('express');
const expenseControl = require('../controller/expense')

const userAuth = require('../autuntication/auth')

const router = express.Router();



router.get('/getExpense/:expenseid', userAuth.authentiateUser, expenseControl.getSingleUserExpense);
//router.get('/getAllExpense', userAuth.authentiateUser, expenseControl.getAllExpense);

router.get('/getAllExpense/:pageno/:dataOnPage', userAuth.authentiateUser, expenseControl.getAllExpense)

router.get('/download', userAuth.authentiateUser, expenseControl.downloadUserExpenses)
router.get('/allDownloads', userAuth.authentiateUser, expenseControl.getAllDownloadedFileUrls)
router.post('/addexpense', userAuth.authentiateUser, expenseControl.addExpense)

router.delete('/deleteuserexpense/:userid', userAuth.authentiateUser, expenseControl.deleteUserExpense)

router.put('/expensechange', userAuth.authentiateUser, expenseControl.editUserExpense)


module.exports = router;