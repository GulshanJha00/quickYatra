const userModel = require("../models/user.model")
const userService = require("../service/user.service")
const {validationResult} = require("express-validator")
const blacklistTokenModel = require("../models/blacklistToken.model")

module.exports.registerUser =async(req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    console.log(req.body);
    
    const {fullname, email,password} = req.body;
    

    const hashPassword = await userModel.hashPassword(password)

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname : fullname.lastname,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken() //user.generateAuthToken()
    res.status(200).json({token,user})

}

module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    } 

    console.log(req.body);
    
    const {email,password} = req.body;
    
    const user = await userModel.findOne({email}).select('+password') //select is false so we will get undefined. So we use select

    if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
    }    
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = user.generateAuthToken();
    res.cookie('token',token);

    return res.status(200).json({token,user})
}
module.exports.getUserProfile = async(req,res,next)=>{
    const user = await userModel.findById(req.user._id).select("-password -__v")
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    return res.status(200).json({user})
}

module.exports.getUserProfile = async(req,res,next)=>{
    return res.status(200).json(req.user)
}


module.exports.logoutUser = async(req,res,next)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];
    await blacklistTokenModel.create({token}) //store token in blacklist
    return res.status(200).json({message: "Logout successful"})
}