import {z} from 'zod';
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt';

const UserSchema = z.object({
    phone_number: z.string().min(10).max(10),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    fullname: z.string().min(1, 'Full name is required')
});

export const POST = async(req : Request)=>{

    try{
        const body = await req.json()

        const result = UserSchema.safeParse(body)

        if (!result.success) {
            return new Response(JSON.stringify({ errors: result.error }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { phone_number, password, fullname } = result.data

        const existingUser = await prisma.user.findUnique({
                where: { phone_number }
            });

        if (existingUser) {
            return new Response(JSON.stringify({ errors: { phone_number: 'Phone number already registered' } }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.$transaction(async(tx)=>{
            const user = await tx.user.create({
                data:{
                    phone_number,
                    fullname,
                    password: hashedPassword
                }
            })
            const randomBalance = Math.random() * 100000;

            await tx.account.create({
                data:{
                    user_id: user.id,
                    balance: randomBalance
                }
            })

            return user
        })

        console.log('New user created:', newUser);

        return new Response(JSON.stringify({ 
            msg: 'User successfully signed up',
            user: {
                id: newUser.id,
                phone_number: newUser.phone_number,
                fullname: newUser.fullname
            }
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });
    }catch(e){
        console.error('Signup error:', e);
        return new Response(JSON.stringify({ errors: { server: 'Internal server error' } }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}