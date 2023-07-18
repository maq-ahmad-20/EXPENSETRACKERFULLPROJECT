const express = require('express')
const premiumOrderControler = require('../controller/premiumorder');


const auth = require("../autuntication/auth");

const router = express.Router();

router.get(
    "/purchasepremiermembership",
    auth.authentiateUser,
    premiumOrderControler.purchasePremiumMemberShip
);

router.post(
    "/updateTransactionStatus",
    auth.authentiateUser,
    premiumOrderControler.updateTransactionStatus
);

module.exports = router;


