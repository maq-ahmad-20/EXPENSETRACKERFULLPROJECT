const express = require('express');
const sequelize = require('./util/db')
const fs = require('fs')
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user')
const loginRouter = require('./router/login')
const User = require('../server/model/user')
const Expense = require('../server/model/expense')
const ForgotPasswordRequest = require('./model/forgotpasswordrequest')
const expenseRouter = require('./router/expense')
const Order = require('./model/premiumorder')
const premiumOrderRouter = require('./router/premiumorder')
const leaderboardRouter = require('./router/leaderboard')
const forgotPasswordRouter = require('./router/forgotpassword')

const Download = require('./model/download')

const reportsRouter = require('./router/reports')

require('dotenv').config()
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))

const accessLogStream = fs.createWriteStream(
    'access.log',
    { flags: "a" }
);

const morgan = require("morgan");
app.use(morgan("combined", { stream: accessLogStream }));




app.use(cors())

app.use(express.json())






app.use(userRouter)

app.use(loginRouter);
app.use('/expense', expenseRouter)
app.use(premiumOrderRouter)
app.use(leaderboardRouter)
app.use('/password', forgotPasswordRouter)
app.use(reportsRouter)

Expense.belongsTo(User);
User.hasMany(Expense);





Order.belongsTo(User);
User.hasMany(Order);

ForgotPasswordRequest.belongsTo(User)
User.hasMany(ForgotPasswordRequest);

User.hasMany(Download)
Download.belongsTo(User)


sequelize.sync({ alter: true }).then((result) => {

    app.listen(7000);


    console.log("Sequalizeworking")
})

