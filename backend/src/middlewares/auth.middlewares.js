import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'


const verifyJWT = async (req, res, next) => {
 try {
     
    // const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
    
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
   

    if(!token) {
        return res.status(401).json({
            success: false,
            message: "unauthorized request"
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password")
    
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid token"
            })
        }

        req.user = user;
        next()

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token request"
        })
    }

 } catch (error) {
    return res.status(500).json({
        success: false,
        message: "something went wrong"
    })
 }
}

export {verifyJWT};