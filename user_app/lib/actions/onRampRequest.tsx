'use server'

import { v4 as uuidv4 } from 'uuid';
import { prisma } from "@/lib/prisma"
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '../auth';



export async function CreateOnRampTransaction(provider: string, amount: number) {
    try {
        const session = await getServerSession(NEXT_AUTH)
        if (!session.user.id || !provider || !amount || amount <= 0) {
            throw new Error('Invalid input: userId, provider, and a positive amount are required');
        }
        const transaction = await prisma.onRampTransaction.create({
            data: {
                userId: Number(session.user.id),
                provider,
                amount,
                status: "PROCESSING",
                token: uuidv4(),
                startTime: new Date(),
            },
        });
        return {
            status: 200,
            message: "Transaction created successfully",
        }

    } catch (e) {
        console.error('Error creating on-ramp transaction:', e);
        return {
            status: 401,
            message: "Failed to create transaction"
        }
    }
}