import jwt from 'jsonwebtoken'
import { JWT_SECRET } from './config'
import { Request, Response, NextFunction } from 'express'

interface CustomJwtPayload extends jwt.JwtPayload {
  userId: string;
}

export const authMiddleware= (req : Request,res :Response,next : NextFunction)=>{
    const auth_header = req.headers.authorization

    if(!auth_header || !auth_header.startsWith('Bearer')){
        return res.status(411).json({
            msg: "Please Sign In to access this!"
        })
    }

    const token= auth_header.split(' ')[1]

    try{
        const decoded = jwt.verify(token,JWT_SECRET) as CustomJwtPayload
        req.userId= decoded.userId
        next()             

    }catch(err){
        return res.status(403).json({
            msg: "Error Signing In"
        })
    }

}