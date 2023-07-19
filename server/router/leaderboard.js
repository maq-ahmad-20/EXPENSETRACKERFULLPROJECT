const express = require('express');
const leaderboardControl = require('../controller/leaderboard')

const userAuth = require('../autuntication/auth')

const router = express.Router();


//router.get('/leaderboard', leaderboardControl.getLeaderBoardpage)

router.get('/getAllLeaderboardData', leaderboardControl.getAllExpensesOfUSers)

module.exports = router