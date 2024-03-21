const express = require('express')
const dotenv = require('dotenv')

const prisma = require('./src/database/prisma');
const empRoutes = require('./src/employee/routes/employee.route');
dotenv.config();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
    console.log(`👉 Endpoint: ${req.originalUrl}${req.method}`);
    next()
});

app.get('/', (req, res) => {
    return res.json("hello world!");
});

app.use('/api/employee', empRoutes)

app.listen(process.env.PORT, (req, res) => {
    console.log(`App Listening port is ${process.env.PORT}`);
})