"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import { id } from "zod/v4/locales";

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
                    toUserId: Number(toUser?.id),
                }
            })

        })
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