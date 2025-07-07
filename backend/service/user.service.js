const userModel = require("../models/user.model")


//creating user
module.exports.createUser = async({
    firstname, lastname, email, password
})=>{
    console.log(firstname,lastname,email,password)
    if(!email || !firstname || !password){
        throw new Error("All fields required")
    }

    const user = userModel.create({
        fullname:{
            firstname,lastname
        },
        email,
        password
    })
    return user
}