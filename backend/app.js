const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config();
const connectToDb = require("./db/db")

const cors = require('cors')
app.use(cors())
connectToDb();


app.get("/",(req,res)=>{
    res.send("Yo")
})
module.exports = app;