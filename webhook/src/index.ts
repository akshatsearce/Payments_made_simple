import express from 'express'
import {prisma as db} from '../lib/prisma'

import z from 'zod';

const app = express();

app.use(express.json());

// Define the Zod schema for the incoming webhook body
const bankWebhookBody = z.object({
  token: z.string(),
  userId: z.number(),
});

app.post('/bankWebhook', async (req, res) => {
  const validationResult = bankWebhookBody.safeParse(req.body);

  if (!validationResult.success) {
    console.error('Invalid webhook body received:', validationResult.error);
    return res.status(400).json({
      message: 'Invalid input data',
      errors: validationResult.error.flatten(),
    });
  }

  const { token, userId } = validationResult.data;

  try {
    const result = await db.$transaction(async (prisma) => {
      const onRampTransaction = await prisma.onRampTransaction.findUnique({
        where: {
          token: token,
          userId: Number(userId)
        },
        select: {
          amount: true,
          status: true
        }
      });

      // If no transaction is found or it's already successful, throw an error
      if (!onRampTransaction || onRampTransaction.status != "PROCESSING") {
        // Throw an error with a custom property
        const err: any = new Error('Webhook processed or invalid token');
        err.statusCode = 411;
        throw err;
      }

      await prisma.balance.update({
        where: {
          userId: Number(userId),
        },
        data: {
          amount: {
            increment: Number(onRampTransaction.amount),
          },
        },
      });

      await prisma.onRampTransaction.update({
        where: {
          token: token,
          userId: Number(userId),
        },
        data: {
          status: 'SUCCESS',
        },
      });

      return true;
    });

    res.json({
      message: 'Captured',
    });
  } catch (e: any) {
    if (e.statusCode === 411) {
      return res.status(411).json({
        message: e.message,
      });
    }
    console.error('Error while processing webhook:', e);
    res.status(500).json({
      message: 'Error while processing webhook',
    });
  }
});

app.listen(3003, () => {
  console.log(`Server is running on port 3003`);
});