import ViewBalance from "@/components/balanceCard";
import { NEXT_AUTH } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function GetBalance() {

    const session = await getServerSession(NEXT_AUTH)
    const balance = await prisma.balance.findFirst({
        where:{
            userId: Number(session?.user?.id)
        }
    })
    return {
        balance: balance?.amount || 0
    }
    
}

export default async function(){
    const {balance} = await GetBalance()
    return <div className="w-screen">
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-400 to-emerald-400 p-4">
        <ViewBalance balance={balance}/>
        </div>
    </div>
}