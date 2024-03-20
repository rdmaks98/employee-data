const express = require('express')
const dotenv = require('dotenv')

const prisma = require('./src/database/prisma');
const empRoutes = require('./src/employee/routes/employee.route');
dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/api/employee', empRoutes)

app.listen(2010, () => {
    console.log('App Listening port is 2010')
})