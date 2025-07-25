import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from './config'
import { Request, Response, NextFunction } from 'express'

interface AuthResponse extends Request {
  userId?: string;
}

export const authMiddleware= (req : AuthResponse, res :Response,next : NextFunction)=>{
    const auth_header = req.headers.authorization

    if(!auth_header || !auth_header.startsWith('Bearer')){
        return res.status(411).json({
            msg: "Please Sign In to access this!"
        })
    }

    const token= auth_header.split(' ')[1]

    try{
        const decoded = <JwtPayload>jwt.verify(token,JWT_SECRET)
        req.userId= decoded.userId
        next()             

    }catch(err){
        return res.status(403).json({
            msg: "Error Signing In"
        })
    }

}