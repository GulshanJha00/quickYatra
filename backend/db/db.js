const mongoose = require("mongoose")

function connectToDb(){
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Connection Successful")
    } catch (error) {
        console.log("error in connecting to database")
    }
}

module.exports = connectToDb