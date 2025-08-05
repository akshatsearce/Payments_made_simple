import { AddMoney } from "@/components/AddMoneyCard";
import SendMoneyCard from "@/components/SendMoneyCard";

export default function(){
    return <div className="w-screen">
        Transfer
        <AddMoney/>
        <SendMoneyCard/>
    </div>
}