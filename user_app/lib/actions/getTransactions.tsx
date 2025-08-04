"use server"
import { prisma } from '@/lib/prisma'

export default async function GetAllTransaction() {
    try {
    const transactions = await prisma.transaction.findMany({
      select: {
        id: true,
        amount: true,
        transaction_type: true,
        status: true,
        sender_account: {
          select: {
            user: {
              select: {
                fullname: true,
              },
            },
          },
        },
        receiver_account: {
          select: {
            user: {
              select: {
                fullname: true,
              },
            },
          },
        },
      },
    });

    // Format the response to include sender and receiver names
    const formattedTransactions = transactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      transaction_type: transaction.transaction_type,
      status: transaction.status,
      senderName: transaction.sender_account.user.fullname ?? 'Unknown',
      receiverName: transaction.receiver_account?.user.fullname ?? 'Unknown',
    }));

    return formattedTransactions
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return []
  }
}