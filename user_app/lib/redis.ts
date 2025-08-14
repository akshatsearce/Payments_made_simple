// lib/redis.ts
// This file handles the Redis client connection. We're using the 'redis' package (npm install redis).
// For production, ensure REDIS_URL is set in your environment variables (e.g., redis://localhost:6379 or a cloud provider URL).

import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | null = null;

export async function getRedisClient(): Promise<RedisClientType> {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    });

    redisClient.on('error', (err) => console.error('Redis Client Error', err));

    await redisClient.connect();
  }
  return redisClient;
}