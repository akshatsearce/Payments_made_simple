import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers:[
        CredentialsProvider({
            name: 'Phone Number',
            credentials :{
                phone_number:{label: 'phone_number' , type:'number', placeholder:'xxxxx xxxxx'},
                otp:{label:'otp' , type:'number' , placeholder:'xxxxx'},
            },
            
            async authorize(credentials: any) {
                return {
                    id: "user1"
                }
            }
        })
    ],
})

export { handler as GET, handler as POST }