'use server'
import { error } from "console";
import { prisma } from "../prisma";
import { computeHmac, decryptPhoneNumber } from "../encryption";

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
    if (!params || params.trim() === '') {
        return {
            status: true,
            data: [],
        };
    }
    try {
        const users = await prisma.user.findMany({
            where: {
                numberBlindIndex: {
                    contains: computeHmac(params),
                },
            },
            select: {
                id: true,
                name: true,
                email: true,
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