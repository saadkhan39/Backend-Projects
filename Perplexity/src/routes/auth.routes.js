import { Router } from "express";
import { registerValidator ,loginValidator } from "../validators/auth.validator.js";
import authController from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router()


// POST /api/auth/register
authRouter.post("/register",registerValidator,authController.registerUser)

// POST /api/auth/login
authRouter.post("/login",loginValidator, authController.loginUser)

// GET /api/auth/get-me
authRouter.get("/get-me",authUser,authController.getMe)

// GET /api/auth/verify-email
authRouter.get("/verify-email",authController.verifyEmail)


export default authRouter