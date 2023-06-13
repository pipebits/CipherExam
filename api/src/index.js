require('dotenv').config()
const express = require("express")
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.listen(process.env.PORT, _ => {
    console.log(`App listening on port ${process.env.PORT}`)
})