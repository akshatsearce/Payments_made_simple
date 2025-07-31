"use server"
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../auth";
import { prisma } from '@/lib/prisma'

export async function p2pTransfer(to: string, amount: number) {
    try {
        // Validate input
        if (!to || amount <= 0) {
            return { message: "Invalid recipient or amount" };
        }

        // Get session and sender ID
        const session = await getServerSession(NEXT_AUTH);
        const from = session?.user?.id;
        if (!from) {
            return { message: "Unauthorized: Please log in" };
        }

        // Start transaction
        return await prisma.$transaction(async (tx) => {
            // Find sender's account with user
            const senderAccount = await tx.account.findUnique({
                where: { user_id: Number(from) },
                include: { user: true }
            });

            if (!senderAccount) {
                throw new Error("Sender account not found");
            }

            // Check if sending to self
            if (senderAccount.user.phone_number === to) {
                throw new Error("Cannot transfer to self");
            }

            // Find recipient by phone number
            const recipientAccount = await tx.account.findFirst({
                where: { 
                    user: { phone_number: to }
                }
            });

            if (!recipientAccount) {
                throw new Error("Recipient not found");
            }

            // Check sufficient funds
            if (senderAccount.balance < amount) {
                throw new Error("Insufficient funds");
            }

            // Update sender's balance
            await tx.account.update({
                where: { id: senderAccount.id },
                data: { balance: { decrement: amount } }
            });

            // Update recipient's balance
            await tx.account.update({
                where: { id: recipientAccount.id },
                data: { balance: { increment: amount } }
            });

            // Create transaction record
            await tx.transaction.create({
                data: {
                    sender_account_id: senderAccount.id,
                    receiver_account_id: recipientAccount.id,
                    amount,
                    transaction_type: "TRANSFER",
                    status: "COMPLETED"
                }
            });

            return { message: "Transfer successful" };
        });
    } catch (error: any) {
        return { 
            message: error.message || "Error processing transfer" 
        };
    }
}