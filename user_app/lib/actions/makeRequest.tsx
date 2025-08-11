"use server"

import { getServerSession } from "next-auth"
import { NEXT_AUTH } from "../auth"
import { prisma } from "@/lib/prisma"

export async function MakeRequest(from: string , amount: number) {
    try{
        if(!from || amount <=0){
            return {
                status: 500,
                message: "Invalid recipient or amount"
            }
        }

        const session = await getServerSession(NEXT_AUTH)
        const to = session?.user?.id
        if(!to){
            return {
                status: 500,
                message: "Unauthorized: Please log in" 
            }
        }
        const toUser = await prisma.user.findUnique({
            where: {
                id: Number(to)
            },
        });

        const fromUser = await prisma.user.findUnique({
            where: {
                number: from
            },
            select:{
                id: true
            }
        });

        if (!fromUser || !toUser) {
            return { 
                status: 400,
                message: "Invalid recipient" 
            };
        }

        if(fromUser.id == to){
            return { 
                status: 400,
                message: "Cannot Request to yourself!" 
            };
        }

        await prisma.p2pTransfer.create({
            data:{
                amount: amount,
                status: "PROCESSING",
                timestamp: new Date(),
                fromUserId: Number(fromUser.id),
                toUserId: Number(to)
            }
        })
        
        return {
            status: 200,
            message: "Request generated"
        }

    }catch (e:any){
        console.log("Request error",e)

        return {
            status: 400,
            message:"Failed generating Requesting"
        }
    }
    
}