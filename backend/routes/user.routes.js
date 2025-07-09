const express = require("express")
const router = express.Router()
const {body} = require("express-validator")
const userController = require("../controllers/user.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post("/register",[
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("Minimum length of 3 is required in first name"),
    body('password').isLength({min:5}).withMessage("Minimum length of 5 is required")

], userController.registerUser)

router.post("/login",[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:5}).withMessage("Minimum length of 5 is required")
], userController.loginUser)

router.get("/profile",authMiddleware.authUser, userController.getUserProfile)
router.get("/logout", authMiddleware.authUser, userController.logoutUser)
module.exports = router