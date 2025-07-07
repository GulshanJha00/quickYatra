const express = require('express')
const app = express()
const dotenv = require("dotenv")
dotenv.config();
const connectToDb = require("./db/db")
const userRoutes = require("./routes/user.routes")

app.use(express.json())
app.use(express.urlencoded({extended: true}))


const cors = require('cors')
app.use(cors())
connectToDb();


app.get("/",(req,res)=>{
    res.send("Yo")
})

app.use("/users",userRoutes)

module.exports = app;