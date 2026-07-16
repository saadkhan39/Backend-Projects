import express from 'express'
import { login, register ,verifyEmail ,getMe, resendEmailVerification,logout} from '../controllers/auth.controller.js'
import {validateRegister,validateLogin} from '../validators/auth.validator.js'
import { authUser } from '../middleware/auth.middleware.js'

const authRouter = express.Router()

authRouter.post('/register', validateRegister, register)

authRouter.post("/login",validateLogin,login)

authRouter.get("/logout",authUser,logout)

authRouter.get("/get-me",authUser,getMe)

authRouter.get("/verify-email",verifyEmail)

authRouter.get("/resend-email",resendEmailVerification)

export default authRouter
