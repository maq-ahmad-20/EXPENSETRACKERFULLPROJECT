const express = require('express');
const sequelize = require('./util/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user')
const loginRouter = require('./router/login')
const User = require('../server/model/user')
const Expense = require('../server/model/expense')
const expenseRouter = require('./router/expense')
const Premiumorders = require('./model/premiumorder')
const premiumOrderRouter = require('./router/premiumorder')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))






app.use(cors())

app.use(express.json())






app.use(userRouter)

app.use(loginRouter);
app.use(expenseRouter)
app.use(premiumOrderRouter)

Expense.belongsTo(User);
User.hasMany(Expense);




User.hasMany(Premiumorders);
Premiumorders.belongsTo(User);

sequelize.sync().then((result) => {

    app.listen(7000);


    console.log("Sequalizeworking")
})

