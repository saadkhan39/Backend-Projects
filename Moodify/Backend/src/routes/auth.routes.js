const express = require("express")
const authController = require("../controller/authController")
const { authUser } = require("../middleware/auth.middleware")

const authRouter = express.Router()

// POST /api/auth/register
authRouter.post("/register",authController.registerUser)


// POST  /api/auth/login
authRouter.post("/login",authController.loginUser) 

// GET /api/auth/get-me
authRouter.get("/get-me",authUser,authController.getMe)


// GET /api/auth/logout
authRouter.get("/logout",authController.logoutUser) 


module.exports = authRouter

