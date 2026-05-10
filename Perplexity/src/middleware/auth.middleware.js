import jwt from "jsonwebtoken"

export async function authUser(req,res,next){
    
    const token = req.cookies.token

    if(!token){
        return res.status(400).json({
           message:"unauthorized access",
           secure:false,
           err:"token not provided"
        })
    }

    try {
        const decoded = jwt.verify(
            token,process.env.JWT_SECRET
        )

        req.user =decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message:"unautorized",
            secure:false,
            err:"Invalid token"
        })
    }
}