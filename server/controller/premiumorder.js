
const razorPay = require('razorpay')
const Order = require('../model/premiumorder')

const loginController = require('../controller/login')
exports.purchasePremiumMemberShip = async (req, res, mext) => {


    try {
        let userinstance = req.user;

        console.log(req.user)
        var rzp = new razorPay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET
        });

        const amount = 50000;
        rzp.orders.create({ amount, currency: "INR" }, (error, order) => {
            if (error) {
                console.log(error)
                return
            }
            console.log(order.id)
            userinstance.createOrder({ orderid: order.id, status: "PENDING" }).then((createdorder) => {
                console.log(createdorder);
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
        console.log(userId)
        console.log(req.body)
        const { order_id, payment_id } = req.body;
        const order = await Order.findOne({ where: { orderid: order_id } });
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
                    token: loginController.genretareAccessToken(userId)
                });
            })
            .catch((error) => {
                throw new Error(error);
            });
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err, message: "Something went wrong" });
    }
};
