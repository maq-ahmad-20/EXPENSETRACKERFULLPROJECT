const express = require("express");
const router = express.Router();
const reportsController = require("../controller/report");
const userAuthentication = require("../autuntication/auth");


router.post("/getDailyReports", userAuthentication.authentiateUser, reportsController.reportsOfDay);
router.post("/getMonthlyReports", userAuthentication.authentiateUser, reportsController.reportsOfMonth);
router.post("/getYearlyyReports", userAuthentication.authentiateUser, reportsController.reportsOfYear);

module.exports = router;
