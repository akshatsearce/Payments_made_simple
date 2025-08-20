"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { createNotification } from "./notificationAction";

export async function p2pTransfer(to: string, amount: number , pin: string) {
    try {

        if (!to || amount <= 0) {
            return { message: "Invalid recipient or amount" };
        }

        const session = await getServerSession(NEXT_AUTH);
        const from = session?.user?.id;
        if (!from) {
            return { message: "Unauthorized: Please log in" };
        }

        const toUser = await prisma.user.findUnique({
            where: {
                number: to
            },
            select: {
                id: true,
            }
        })
        const fromUser = await prisma.user.findUnique({
            where:{
                id: Number(from)
            },
            select:{
                pin: true
            }
        })


        if (!fromUser || !toUser) {
            return { message: "Invalid recipient" };
        }

        const isPinValid = await bcrypt.compare(pin, fromUser.pin);

        if (!isPinValid) {
            return { message: "Invalid Pin" };
        }

        if (toUser.id == from) {
            return { message: "Cannot transfer to yourself!" }
        }

        await prisma.$transaction(async(tx)=>{
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`

            const fromBalance = await tx.balance.findUnique({
                where:{
                    userId: Number(from)
                },
                select:{
                    amount: true
                }
            })

            if(!fromBalance || fromBalance.amount < amount){
                throw new Error('Insufficient Balance')
            }

            await tx.balance.update({
                where:{
                    userId: Number(from)
                },
                data:{
                    amount: {decrement: amount}
                }
            })

            await tx.balance.update({
                where: {userId: Number(toUser?.id)},
                data:{
                    amount: {increment: amount}
                }
            })

            await tx.p2pTransfer.create({
                data: {
                    amount: amount,
                    timestamp: new Date(),
                    fromUserId: Number(from),
                    status: "SUCCESS",
                    toUserId: Number(toUser?.id),
                }
            })

        })
        
        await createNotification({
            userId: toUser?.id,
            message: `You have received ${amount} from ${from}`,
            type: "TRANSFER",
            relatedId: ""
        });

        return {
            status: 200,
            message: "Transfer Successfull"
        }

    } catch (e) {
        console.error("P2P Transfer Error:", e);
        return { 
            status: 400,
            message: "Transfer failed. Please try again later." 
        };
    }
}


export async function p2pRequestTransfer(transactionId: number, pin: string) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        const userId = session?.user?.id;
        if (!userId) {
            return { status: 401, message: "Unauthorized: Please log in" };
        }

        // Fetch the transaction
        const transaction = await prisma.p2pTransfer.findUnique({
            where: { id: transactionId },
            select: { toUserId: true, fromUserId: true, amount: true, status: true }
        });

        if (!transaction) {
            return { status: 404, message: "Transaction not found" };
        }

        if (transaction.fromUserId !== Number(userId)) {
            return { status: 403, message: "Forbidden: Not your transaction" };
        }

        if (transaction.status !== "PROCESSING") {
            return { status: 400, message: "Transaction already processed" };
        }

        // Get user's pin
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
            select: { pin: true }
        });

        if (!user) {
            return { status: 404, message: "User not found" };
        }

        const isPinValid = await bcrypt.compare(pin, user.pin);

        if (!isPinValid) {
            await prisma.p2pTransfer.update({
                where: { id: transactionId },
                data: { status: "FAILURE" }
            });
            return { status: 400, message: "Invalid Pin. Transaction failed." };
        }

        // Transaction: update balances and mark as SUCCESS
        await prisma.$transaction(async (tx) => {
            // Lock receiver's balance
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(userId)} FOR UPDATE`;
            // Lock sender's balance
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(transaction.fromUserId)} FOR UPDATE`;

            // Update receiver's balance
            await tx.balance.update({
                where: { userId: Number(userId) },
                data: { amount: { increment: transaction.amount } }
            });

            // Update sender's balance
            await tx.balance.update({
                where: { userId: Number(transaction.fromUserId) },
                data: { amount: { decrement: transaction.amount } }
            });

            // Mark transaction as SUCCESS
            await tx.p2pTransfer.update({
                where: { id: transactionId },
                data: { status: "SUCCESS" }
            });
        });

        return { status: 200, message: "Transaction successful" };

    } catch (e) {
        console.error("P2P Request Transfer Error:", e);
        // Optionally mark as failed if error is not due to pin
        await prisma.p2pTransfer.update({
            where: { id: transactionId },
            data: { status: "FAILURE" }
        }).catch(() => {});
        return { status: 500, message: "Internal server error" };
    }
}