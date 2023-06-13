require('dotenv').config()
const express = require("express")
const app = express()

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL)

app.use(express.json())
app.listen(process.env.PORT, _ => {
    console.log(`App listening on port ${process.env.PORT}`)
})