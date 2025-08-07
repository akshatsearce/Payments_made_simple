import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@/lib/prisma"
import bcrypt from 'bcrypt';
import { number, z } from "zod";
import { Session } from 'inspector/promises';


const CredSchema = z.object({
    number: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    password: z.string(),
});

export const NEXT_AUTH = {
    providers:[
        CredentialsProvider({
            name: 'Phone Number',
            credentials :{
                number:{label: 'number' , type:'string', placeholder:'xxxxx xxxxx'},
                password:{label:'password' , type:'string' , placeholder:'xxxxx'},
            },
            
            async authorize(credentials: any) {
                try{

                    const parsed_cred  = CredSchema.safeParse(credentials)
                    if (!parsed_cred.success) {
                        console.log("Invalid credentials format");
                        return null;
                    }
                    const {number , password} = parsed_cred.data
                    const user = await prisma.user.findUnique({
                        where: {number},
                        select:{
                            id: true,
                            number: true,
                            name: true,
                            password: true,
                        }
                    })

                    if(!user){
                        console.log('No user found with phone number ', number)
                        return null
                    }
                    const isPasswordValid = await bcrypt.compare(password, user.password)
                    if(!isPasswordValid){
                        console.log("Invalid Password")
                        return null
                    }

                    return {
                        id: user.id.toString(),
                        number: user.number,
                        name: user.name,
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
    },
    callbacks:{
        async session({ session , user, token }: {session:any , user: any, token: any}) {
            if (token) {
                session.user = {
                ...session.user,
                id: token.id,
                number: token.number,
                name: token.name,
                };
            }
            return session;
        },
        async jwt({ token, user }:{token:any , user:any}) {
        // On login, persist user info to the token
            if (user) {
                token.id = user.id;
                token.number = user.number;
                token.name = user.name;
            }
            return token;
        },
    }
}