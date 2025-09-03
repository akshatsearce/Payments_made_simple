'use server'
import { error } from "console";
import { prisma } from "../prisma";

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
                number: {
                    contains: params, // Partial matching for phone numbers
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