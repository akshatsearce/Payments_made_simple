'use server'
import { z } from "zod";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt'
import { computeHmac, encryptPhoneNumber } from "../encryption";

const UserSchema = z.object({
  number: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Full Name is required'),
  pin: z.string().min(6 , '6 digits pin required').max(6)
})

interface SignUpProp {
    number: string,
    password: string,
    pin: string,
    name: string
}

export async function SignUpAction(req: SignUpProp){

    try{
        const result = UserSchema.safeParse(req)
        if(!result.success){
            throw new Error(result.error.issues[0].message)
        }
        const {number, password, name , pin} = result.data
        const phoneHmac = computeHmac(number)

        const existingUser = await prisma.user.findUnique({
            where: {numberBlindIndex: phoneHmac}
        })

        if(existingUser){
            throw new Error("Phone Number already registered")
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const hashedPin = await bcrypt.hash(pin,10)

        const encryptedNumber = encryptPhoneNumber(number)

        const newUser = await prisma.$transaction(async(tx)=>{
            const user = await tx.user.create({
                data:{
                    number: encryptedNumber,
                    numberBlindIndex: phoneHmac,
                    name,
                    password: hashedPassword,
                    pin: hashedPin
                }
            })
            const randomBalance = Math.random()* 100000

            await tx.balance.create({
                data: {
                    userId: Number(user.id),
                    amount: randomBalance,
                    locked: 0
                }
            })

            return user
        })

        return {
            status: 201,
            data: {
                id: newUser.id,
                number: newUser.number,
                name: newUser.name
            }
        }        
        
    }catch (error) {
        console.error('Signup error:', error)
        return {
            status: 500,
            error: error instanceof Error ? error.message : "Internal server error"
        }
    }

}