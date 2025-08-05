import { OnRampTransactions } from "@/components/OnRampTransactionCard";
import Portfolio from "@/components/TransactionComponent";
import GetAllTransaction from "@/lib/actions/getTransactions";

export default async function(){

    const transactions = await GetAllTransaction()
    
    return <div className="w-screen">
        {/* <OnRampTransactions transactions={transactions}/> */}
        <Portfolio/>
    </div>
}