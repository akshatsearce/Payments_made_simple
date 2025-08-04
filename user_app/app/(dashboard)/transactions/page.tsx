import { OnRampTransactions } from "@/components/OnRampTransactionCard";
import GetAllTransaction from "@/lib/actions/getTransactions";

export default async function(){

    const transactions = await GetAllTransaction()
    
    return <div className="w-full">
        Transactions
        <OnRampTransactions transactions={transactions}/>
    </div>
}