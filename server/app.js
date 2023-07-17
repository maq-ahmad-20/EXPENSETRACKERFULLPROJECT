const express = require('express');
const sequelize = require('./util/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user')
const loginRouter = require('./router/login')
const User = require('../server/model/user')
const Expense = require('../server/model/expense')
const expenseRouter = require('./router/expense')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))






app.use(cors())

app.use(express.json())


app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            console.log(user.id)
            req.user = user;

            next();
        }).catch(err => console.log(err));
})



app.use(userRouter)

app.use(loginRouter);
app.use(expenseRouter)

Expense.belongsTo(User);
User.hasMany(Expense);

sequelize.sync({ alter: true }).then((result) => {



    console.log("Sequalizeworking")
})

app.listen(7000);