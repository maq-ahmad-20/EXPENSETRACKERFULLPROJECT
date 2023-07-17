const express = require('express');
const sequelize = require('./util/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user')
const loginRouter = require('./router/login')
const userModel = require('../server/model/user')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))




app.use(cors())

app.use(express.json())

sequelize.sync().then((result) => {
    console.log("Sequalizeworking")
})

app.use(userRouter)

app.use(loginRouter);

app.listen(7000);