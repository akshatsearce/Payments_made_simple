'use server'
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/lib/auth';

export default async function GetAllTransaction() {
  
  const session = await getServerSession(NEXT_AUTH)
  if(!session){
    return {message: "Login Required"}
  }
  const id = Number(session.user.id)

  try {
    // Fetch OnRamp transactions
    const onRampTransactions = await prisma.onRampTransaction.findMany({
      where:{
        userId:id,
      },
      select: {
        id: true,
        amount: true,
        status: true,
        provider: true,
        startTime: true,
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    // Fetch P2P transfers
    const p2pTransfers = await prisma.p2pTransfer.findMany({
      where:{
        OR:[
          {fromUserId : id},
          {toUserId: id}
        ]
      },
      select: {
        id: true,
        amount: true,
        timestamp: true,
        fromUser: {
          select: {
            name: true,
          },
        },
        toUser: {
          select: {
            name: true,
          },
        },
      },
    });

    // Format OnRamp transactions
    const formattedOnRampTransactions = onRampTransactions.map((transaction) => ({
      id: transaction.id,
      amount: transaction.amount,
      transaction_type: 'ONRAMP',
      status: transaction.status,
      provider: transaction.provider,
      timestamp: transaction.startTime,
      senderName: transaction.user.name ?? 'Unknown',
      receiverName: 'System', // OnRamp transactions are from user to system
    }));

    // Format P2P transfers
    const formattedP2PTransfers = p2pTransfers.map((transfer) => ({
      id: transfer.id,
      amount: transfer.amount,
      transaction_type: 'P2P',
      status: 'Success', // P2P transfers don't have a status field in schema, assuming Success
      provider:'Wallet' ,
      timestamp: transfer.timestamp,
      senderName: transfer.fromUser.name ?? 'Unknown',
      receiverName: transfer.toUser.name ?? 'Unknown',
    }));

    // Combine both transaction types
    const allTransactions = [...formattedOnRampTransactions, ...formattedP2PTransfers];

    // Sort transactions by timestamp (most recent first)
    return allTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}