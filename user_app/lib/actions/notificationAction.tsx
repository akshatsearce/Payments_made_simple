"use server"
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '../auth';

export async function getUserNotifications(limit = 50) {

  try {
    const session = await getServerSession(NEXT_AUTH)
    if (!session || !session.user || !session.user.id) {
      return {
        success: false,
        error: "User not authenticated"
      };
    }
    const notifications = await prisma.notification.findMany({
      where: {
        userId: Number(session.user.id),
        isRead: false,
      },
      take: limit,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: notifications
    };
  }
  catch (error) {
    console.error("Error fetching user notifications:", error);
    return {
      success: false,
      error: "Failed to fetch notifications"
    };
  }
}

export async function markNotificationAsRead(notificationId: number) {
  try {
    await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true }
    });
    return {
      success: true,
      message: "Notification marked as read"
    };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return {
      success: false,
      error: "Failed to mark notification as read"
    };
  }
}

export async function getUserNotificationsCount() {

  try{
    const session = await getServerSession(NEXT_AUTH)
    if (!session || !session.user || !session.user.id) {
      return {
        success: false,
        error: "User not authenticated"
      };
    }

    const count = await prisma.notification.count({
      where: {
        userId: Number(session.user.id),
        isRead: false,
      }
    });
    return {
      success: true,
      data: count
    };
  } catch (error) {
    console.error("Error fetching user notifications count:", error);
    return {
      success: false,
      error: "Failed to fetch notifications count"
    };
  }
}

import type { $Enums, Prisma } from "@prisma/client";

export type Notification = {
    type: $Enums.NotificationType;
    id: number;
    userId: number;
    content: NotificationContent;
    isRead: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type NotificationResponse = {
    success: boolean;
    data?: Notification[];
    error?: string;
};

export type NotificationContent = {
  message?: string
  timestamp?: Date
  direction?: 'RECEIVE' | 'SEND' | 'WALLET'
  amount?: number
}