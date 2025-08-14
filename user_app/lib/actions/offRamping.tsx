'use server'
import { getRedisClient } from "../redis"

interface offRampingProps {
    userId: number, 
    amount: number,
    pin: string,
    provider: string
}

export const offRamping = async (data: offRampingProps) => {

    try {
        const redis = await getRedisClient()

        if (!data.userId || !data.amount || data.amount <= 0 || !data.pin) {
            throw new Error("Invalid withdraw parameters")
        }
        
        const queueName = 'OFFRAMP_QUEUE'
        const transactionJson = JSON.stringify({
            ...data,
            createdAt: new Date().toISOString()
        })

        await redis.lPush(queueName, transactionJson)

        return {
            success: true,
            message: "Off-ramping transaction queued successfully"
        }
        

    } catch (e) {
        return {
            success: false,
            message: e instanceof Error ? e.message : "An error occurred while processing the request"
        }
    }

}