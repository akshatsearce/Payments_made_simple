import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@/lib/prisma"

import { z } from "zod";


const CredSchema = z.object({
    phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    password: z.string(),
});

export const NEXT_AUTH = {
    providers:[
        CredentialsProvider({
            name: 'Phone Number',
            credentials :{
                phone_number:{label: 'phone_number' , type:'string', placeholder:'xxxxx xxxxx'},
                password:{label:'password' , type:'string' , placeholder:'xxxxx'},
            },
            
            async authorize(credentials: any) {
                try{

                    const parsed_cred  = CredSchema.safeParse(credentials)
                    if (!parsed_cred.success) {
                        console.log("Invalid credentials format");
                        return null;
                    }
                    const {phone_number , password} = parsed_cred.data
                    const user = await prisma.user.findUnique({
                        where: {phone_number},
                        select:{
                            id: true,
                            phone_number: true,
                            fullname: true,
                            password: true
                        }
                    })

                    if(!user){
                        console.log('No user found with phone number ', phone_number)
                        return null
                    }

                    if(user.password !== password){
                        console.log("Invalid Password")
                        return null
                    }

                    return {
                        id: user.id.toString(),
                        phone_number: user.phone_number,
                        fullname: user.fullname
                    }

                }catch(e){
                    console.error("Authentication Error ", e)
                    return null
                }

            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin',
    }
}