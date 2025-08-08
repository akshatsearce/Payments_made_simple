'use server'
import { number, z } from "zod";
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt'
import { error } from "console";

const UserSchema = z.object({
  number: z.string().regex(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(1, 'Full Name is required'),
  pin: z.string().min(6 , '6 digits required').max(6)
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
            return {
                status: 400,
                error: result.error.flatten().fieldErrors
            }
        }
        const {number, password, name , pin} = result.data

        const existingUser = await prisma.user.findUnique({
            where: {number}
        })

        if(existingUser){
            return {
                status: 400,
                error: "Phone Number already registered"
            }
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const hashedPin = await bcrypt.hash(pin,10)

        const newUser = await prisma.$transaction(async(tx)=>{
            const user = await tx.user.create({
                data:{
                    number,
                    name,
                    password: hashedPassword,
                    pin: hashedPin
                }
            })
            const randomBalance = Math.random()* 100000

            await tx.balance.create({
                data: {
                    userId: user.id,
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
            error: "Internal server error"
        }
    }

}
