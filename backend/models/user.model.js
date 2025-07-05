const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userschema = new mongoose.Schema({
    fullname:{
        firstName:{
            type: String,
            required: true,
            minglength: [3,"First name should be more than 3 character long"]
        },
        lastName:{
            type: String,
            minglength: [3,"Last name should be more than 3 character long"]
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [3,"Email should be more than 3 character long"],
    },
    password:{
        type: String,
        required: true,
        minlength: [6,"Password should be more than 6 character long"],

        select: false, //when we find user password dont go to db
    },
    socketId:{
        type: String
    }
})

userschema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id},process.env.JWT_KEY)
    return token;
}
userschema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}
userschema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

module.exports = mongoose.model('user',userschema);