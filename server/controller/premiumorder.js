const Premiumorder = require('../model/premiumorder')
const RazorPay = require('razorpay')
const userController = require('../controller/user')
exports.purchasePremiumMemberShip = async (req, res, mext) => {

    try {

        var rzp = new RazorPay({
            key_id: "rzp_test_KaEuNEYFAA8gv1",
            key_secret: "8qooeTKrpeJ8Atz1lz0OHaWg"
        });

        const amount = +1000;
        rzp.orders.create({ amount: amount, currency: "INR" }, (err, order) => {
            if (err) {
                console.log('Error occured')
                throw new Error(JSON.stringify(err));
            }
            req.user.createPremiumorder({ orderid: order.id, status: "PENDING" }).then(() => {
                console.log(order);
                return res.status(201).json({ order, key_id: rzp.key_id });

            }).catch((err) => {
                throw new Error(err);
            });
        });

    } catch (err) {
        console.log(err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }

}

exports.updateTransactionStatus = async (req, res) => {
    try {
        const userId = req.user.userid;
        const { payment_id, order_id } = req.body;
        const order = await Premiumorder.findOne({ where: { orderid: order_id } });
        const promise1 = order.update({
            paymentid: payment_id,
            status: "SUCCESSFUL",
        });
        const promise2 = req.user.update({ isPremiumUser: true });

        Promise.all([promise1, promise2])
            .then(() => {
                return res.status(202).json({
                    sucess: true,
                    message: "Transaction Successful",
                    token: userController.generateAccessToken(userId)
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: "Sometghing went wrong" });
    }
};
