import TransactionTable from "@/components/tables/transactionTable";

export default function () {

    return <div className="w-full h-screen">
        <div className="sticky top-0 bg-background z-10">
            <h1 className="text-3xl font-bold p-4">Transactions</h1>
        </div>
        <TransactionTable />
    </div>
}