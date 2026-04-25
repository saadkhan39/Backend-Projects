const express = require("express")
const authController = require("../controller/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

const authRouter = express.Router()

// POST /api/auth/register
authRouter.post("/register",authController.registerUser)

// POST  /api/auth/login
authRouter.post("/login",authController.loginUser)

// GET /api/auth/get-me
authRouter.get("/get-me",authMiddleware.authUser,authController.getMe)

// GET /api/auth/logout
authRouter.get("/logout",authController.logoutUser)


module.exports = authRouter