import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import authController from "../controllers/auth.controller.js";

const authRouter = Router()


// POST /api/auth/register
authRouter.post("/register",registerValidator,authController.registerUser)


export default authRouter