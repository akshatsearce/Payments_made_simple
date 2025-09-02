import TransactionTable from "@/components/widget/transactionTable";

export default function () {

    return <div className="w-full h-screen">
        <h1 className="text-3xl font-bold p-4">Transactions</h1>
        <TransactionTable/>
    </div>
}