const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const userController = require("../controllers/user.controller")

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstName').isLength({min:3}).withMessage("Minimum length of 3 is required in first name"),
    body('fullname.lastName').isLength({min:3}).withMessage("Minimum length of 3 is required in last name"),
    body('password').isLength({min:5}).withMessage("Minimum length of 6 is required")
], userController.registerUser)
module.exports = router