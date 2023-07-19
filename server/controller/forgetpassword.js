const Sib = require('sib-api-v3-sdk');

const User = require('../model/user')


exports.sendResetPasswordMail = async (req, res, next) => {
    try {

        const email = req.body.email;

        const isOurEmailUSer = await User.findOne({ where: { useremail: email } });
        if (!isOurEmailUSer) {

            return res.status(404).json({ message: "The Mail is not registered with us please sign up " })
        }

        const client = Sib.ApiClient.instance

        const apiKey = client.authentications['api-key']

        apiKey.apiKey = process.env.API_KEY

        const transEmailAPi = new Sib.TransactionalEmailsApi()
        const sender = {
            email: "maqboolahmad@gmail.com",

        };
        const receivers = [
            {
                email: email,
            },
        ];
        let sendEmailtoUser = await transEmailAPi.sendTransacEmail({
            sender,
            To: receivers,
            subject: "Reset Password for Expense Tracker App",
            subject: "Please Reset Password",
            textContent: "Expense Tracker"

        });

        res.status(201).json({ success: true })

    } catch (err) {
        console.log(err)
    }
}

