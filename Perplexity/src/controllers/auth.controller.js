import userModel from "../models/user.model.js"
import { sendEmail } from "../service/mail.service.js"


async function registerUser(req,res) {

    const {username,email,password} = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or:[
           {username},
           {email}
        ]
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message:"user with this email or username already exists",
            secure:false,
            err:"User already exists"
        })
    }

    const user = await userModel.create({
        username,email,password
    })

    

    await sendEmail({
        to:email,
        subject:"Welcometo Perplexity!",
         html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
    })
     res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
    
}

export default {registerUser}