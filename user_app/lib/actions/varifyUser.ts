"use server"

import { prisma } from "@/lib/prisma"

export default async function VarifyUserAction(number: string){
    
    const toUser = await prisma.user.findUnique({
        where:{
            number: number
        },
        select:{
            name: true
        }
    })

    if(toUser){
        return {
            status: 200,
            msg: toUser.name
        }
        
    }
    return {
        status: 400,
        msg: "User Not Found"
    }

}