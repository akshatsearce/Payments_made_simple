'use server'
import { getServerSession } from "next-auth"
import { getRedisClient } from "../redis"
import { NEXT_AUTH } from "../auth"
import { prisma } from "../prisma"
import bcrypt from 'bcrypt'

interface offRampingProps {
    amount: number,
    pin: string,
    provider: string
}

export const offRamping = async (amount : number , pin : string , provider: string) => {
    const session =await getServerSession(NEXT_AUTH)

    try {
        const redis = await getRedisClient()

        if (!session.user.id || !amount || amount <= 0 || !pin) {
            throw new Error("Invalid withdraw parameters")
        }
        const user = await prisma.user.findUnique({
            where: {id : Number(session.user.id)},
            select: {
                pin: true
            }
        })
        if(!user){
            throw new Error("User Not found")
        }

        const isPinValid = await bcrypt.compare(pin, user.pin);

        if(!isPinValid){
            throw new Error("Invalid Pin")
        }

        const queueName = 'OFFRAMP_QUEUE'
        const transactionJson = JSON.stringify({
            amount,
            provider,
            userId: Number(session.user.id),
            createdAt: new Date().toISOString()
        })

        await redis.lPush(queueName, transactionJson)

        return {
            status: 200,
            message: "Off-ramping transaction queued successfully"
        }
        

    } catch (e) {
        return {
            status: 400,
            message: e instanceof Error ? e.message : "An error occurred while processing the request"
        }
    }

}