import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { sendEmail } from "../services/mail.service.js"
import jwt from "jsonwebtoken"


export async function register(req,res) {
    const {username,email,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
         $or:[
            {username},
            {email}
        ]
    }
    )

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user with this email or username already exists",
            success:false,
            err:"user already exists"
        })
    }

     const hash = await bcrypt.hash(password,10)

      const user = await userModel.create({ 
        username,
        email,
        password:hash
    })

    const emailVerificationToken = jwt.sign({
        email:user.email
    },process.env.JWT_SECRET)
    
    await sendEmail({
        to:email,
        subject:"Welcome to Perplexity",
        html:`
         <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email by clicking the link below: </p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>`
    })


    res.status(201).json({
        message:"user registered successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}

export async function login(req,res) {
    const {email , password} = req.body

    const user = await userModel.findOne({ email }).select("+password")

    if(!user){
        return res.status(400).json({
            message:"unauthorized access",
            secure:false,
            err:"user not found"
        })
    }

   const isPasswordMatched = await bcrypt.compare(password,user.password)

   if(!isPasswordMatched){
    return res.status(403).json({
        message:"invalid password",
        err:"incorrect password",
        secure:false
    })
   }
  
   if(!user.verified){
    return res.status(409).json({
        message:"please verify your email before logging in",
        secure:false,
        err:"email not verified"
    })
   }
 
   const token = jwt.sign({
    id:user._id,
    username:user.username
   },process.env.JWT_SECRET,{
    expiresIn:"7d"
   })

   res.cookie("token",token)

   return res.status(200).json({
    message:"user loggedIn successfully",
    secure:true,
    success:true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
   })
   

}

export async function logout(req,res) {
      res.clearCookie("token");

    res.status(200).json({
        message: "Logged out successfully"
    });
}

export async function verifyEmail(req,res){
      const {token} = req.query

      try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        const user = await userModel.findOne({email:decoded.email})

        if(!user){
            return res.status(401).json({
                message:"Invalid token ",
                secure:false,
                err:"user not found"

            })
        }

        user.verified = true

        await user.save()

        const html =
        `
         <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
        `

        return res.send(html)
      


      } catch (err) {
       return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        }) 
      }
}

export async function resendEmailVerification(req,res) {
    const {email} = req.body
  
    try {
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({
                message:"user not found",
                secure:false,
                err:"user not found"
            })
        }

        if(user.verified){
            return res.status(400).json({
                message:"user  already verified",
                secure:false
            })
        }

        const emailVerificationToken = jwt.sign(
            { email: user.email },
            process.env.JWT_SECRET
        );


        await sendEmail({
             to: email,
            subject: "Verify Your Email",
            html: `
                <p>Hi ${username},</p>

                <p>Click the button below to verify your email.</p>

                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">
                    Verify Email
                </a>

                <p>If you didn't request this email, simply ignore it.</p>
            `
        })

         return res.status(200).json({
            message: "Verification email sent successfully",
            success: true
        });

    } catch (error) {
         return res.status(500).json({
            message: "Something went wrong",
            success: false,
            err: err.message
        });
    }

} 

export async function getMe(req,res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    if(!user){
        return res.status(404).json({
            message:"user not found",
            success:false,
            err:"user not found"
        })
    }
     res.status(200).json({
        message:'user details fetched successfully ',
        success:true,
        user
     })
    
}

