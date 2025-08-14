import { createClient, RedisClientType } from 'redis'
import { prisma } from '../lib/prisma'
import { v4 as uuidv4 } from 'uuid';

async function startWorker() {
  const client: RedisClientType = createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err) => console.error('Redis Client Error', err));

  await client.connect();

  const queueName = 'OFFRAMP_QUEUE';

  console.log('Worker started. Waiting for tasks...');

  while (true) {
    // Use BRPOP for blocking pop (wait indefinitely if queue is empty)
    const result = await client.blPop(queueName, 0); // 0 means block forever

    if (result) {
      const { element } = result;
      try {
        const transaction = JSON.parse(element);
        console.log('Processing withdraw transaction:', transaction);

        // check if the user has that much balance
        const balance = await prisma.balance.findUnique({
          where: { userId: transaction.userId },
          select: { amount: true }
        })

        if (balance && balance.amount < transaction.amount) {
          throw new Error(`Insufficient balance for userId ${transaction.userId}`);
        }

        await prisma.offRampTransaction.create({
          data: {
            userId: transaction.userId,
            amount: transaction.amount,
            status: "PROCESSING",
            timestamp: new Date(),
            provider: transaction.provider,
            token: uuidv4()
          }
        });
        console.log(`Withdrawal transaction created for userId ${transaction.userId}`);

        // If successful, you might want to log or update status in DB/Redis
      } catch (error) {
        console.error('Error processing transaction:', error);
        // Handle errors: e.g., push to a dead-letter queue
        await client.rPush(`${queueName}-errors`, element);
      }
    }
  }
}

startWorker().catch(console.error);