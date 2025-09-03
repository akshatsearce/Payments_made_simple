'use server'
import { error } from "console";
import { prisma } from "../prisma";
import { computeHmac, decryptPhoneNumber } from "../encryption";

function validatePhonePrefix(prefix: string): boolean {
  return /^\d{1,15}$/.test(prefix); // Allow 1-15 digits
}

export async function SearchByName(params: string) {
    if (!params || params.trim() === '') {
        return {
            status: true,
            data: [],
        };
    }
    try {
        const users = await prisma.user.findMany({
            where: {
                name: {
                    contains: params,
                    mode: 'insensitive', // Case-insensitive search
                },
            },
            select: {
                id: true,
                name: true,
                email: true, // Include other fields as needed
                number: true,
            },
            take: 5
        });

        users.forEach(user => {
            user.number = decryptPhoneNumber(user.number);
        });

        return {
            status: true,
            data: users,
        };
    } catch (e) {
        return {
            status: false,
            error: error(e),
        };
    }

}


export async function SearchByPhone(params: string) {
  if (!params || params.trim() === '' || !validatePhonePrefix(params)) {
    return {
      status: true,
      data: [],
    };
  }

  try {
    const prefixHash = computeHmac(params);

    // Find matching prefix indexes and get distinct userIds
    const matchingIndexes = await prisma.phoneIndex.findMany({
      where: { partialHash: prefixHash },
      select: { userId: true },
      distinct: ['userId'], // Ensure unique users
      take: 5, // Limit to 5 distinct users
    });

    if (matchingIndexes.length === 0) {
      return {
        status: true,
        data: [],
      };
    }

    const userIds = matchingIndexes.map(index => index.userId);

    // Fetch candidate users
    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: {
        id: true,
        name: true,
        email: true,
        number: true, // Encrypted
      },
      take: 5, // Redundant but ensures limit
    });

    // Decrypt numbers and verify prefix match (handles rare hash collisions)
    const verifiedUsers = users.map(user => ({
      ...user,
      number: decryptPhoneNumber(user.number),
    })).filter(user => user.number.startsWith(params));

    return {
      status: true,
      data: verifiedUsers,
    };
  } catch (e) {
    return {
      status: false,
      error: e instanceof Error ? e.message : 'Unknown error',
    };
  }
}