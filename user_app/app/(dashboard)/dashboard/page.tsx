import BalanceCard from "@/components/widget/balanceCard";
import { NEXT_AUTH } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function GetBalance() {

    const session = await getServerSession(NEXT_AUTH)
    if (!session) {
        return {
            balance: 0
        }
    }
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

    return <div className="w-full h-screen flex justify-center items-center dark:bg-[url('https://i.pinimg.com/736x/93/c5/80/93c5807120ad42b4c3fbd1c67a35bf9e.jpg')] bg-cover bg-center
    bg-[url('https://i.pinimg.com/736x/9d/80/91/9d80917cfa80bc969b5914b8f2e0ae99.jpg')] ">
            <BalanceCard balance={balance}/>
        </div>
}