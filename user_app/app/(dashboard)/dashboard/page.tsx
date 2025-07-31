import UserInfo from "@/components/userInfo";
import { NEXT_AUTH } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function GetBalance() {

    const session = await getServerSession(NEXT_AUTH)
    const account = await prisma.account.findFirst({
        where:{
            user_id: Number(session?.user?.id)
        }
    })
    return {
        balance: account?.balance || 0
    }
    
}

export default async function(){
    const {balance} = await GetBalance()
    return <div>
        Dashboard
        <UserInfo balance={balance}/>
    </div>
}