"use server"
import { getRedisClient } from "../redis";

export interface NotificationProp {
  id: string;
  userId: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: number; // timestamp
  relatedId?: string;
}

const NOTIFICATION_EXPIRY = 60 * 60 * 24 * 30; // 30 days in seconds

/**
 * Creates a notification for a user
 */
export async function createNotification({
  userId,
  message,
  type,
  relatedId,
}: {
  userId: number;
  message: string;
  type: string;
  relatedId?: string;
}) {
  try {
    const redis = await getRedisClient()
    const notificationId = `notification:${crypto.randomUUID()}`;
    const notification: NotificationProp = {
      id: notificationId,
      userId,
      message,
      type,
      isRead: false,
      createdAt: Date.now(),
      relatedId,
    };

    // Store the notification with expiry
    await redis.set(notificationId, JSON.stringify(notification), {
      EX: NOTIFICATION_EXPIRY,
    });

    // Add to user's notification list
    await redis.lPush(`user:${userId}:notifications`, notificationId);
    

    return { success: true, notification };
  } catch (error) {
    console.error('Failed to create notification:', error);
    return { success: false, error: 'Failed to create notification' };
  }
}

/**
 * Marks a notification as read
 */
export async function markNotificationAsRead(notificationId: string) {
  try {
    const redis = await getRedisClient()
    const notificationData = await redis.get(notificationId);
    if (!notificationData) {
      return { success: false, error: 'Notification not found' };
    }

    const notification: NotificationProp = JSON.parse(notificationData);
    notification.isRead = true;

    await redis.set(notificationId, JSON.stringify(notification), {
      EX: NOTIFICATION_EXPIRY,
    });

    return { success: true };
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
    return { success: false, error: 'Failed to mark notification as read' };
  }
}

/**
 * Gets all notifications for a user
 */
export async function getUserNotifications(userId: number, limit = 50) {
  try {
    // Get notification IDs for this user (most recent first, limited)
    const redis = await getRedisClient()
    const notificationIds = await redis.lRange(`user:${userId}:notifications`, 0, limit - 1);
    
    if (!notificationIds.length) {
      return { success: true, notifications: [] };
    }

    // Get notification data in bulk
    const notificationData = await Promise.all(
      notificationIds.map(id => redis.get(id))
    );

    // Parse and filter out any null values (expired notifications)
    const notifications = notificationData
      .filter(Boolean)
      .map(data => JSON.parse(data as string) as NotificationProp)
      .sort((a, b) => b.createdAt - a.createdAt); // Sort by createdAt desc

    return { success: true, notifications };
  } catch (error) {
    console.error('Failed to get notifications:', error);
    return { success: false, error: 'Failed to get notifications' };
  }
}