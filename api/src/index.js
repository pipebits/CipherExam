require('dotenv').config()
const express = require("express")
const app = express()

app.listen(process.env.PORT, _ => {
    console.log(`App listening on port ${process.env.PORT}`)
})