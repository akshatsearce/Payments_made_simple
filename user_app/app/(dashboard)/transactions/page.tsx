import GetAllTransaction from "@/lib/actions/getTransactions";
import { Search ,ChevronDown} from 'lucide-react';

export default async function () {

    const transactions = await GetAllTransaction()

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-500';
            case 'PENDING':
                return 'bg-yellow-500';
            case 'FAILED':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <div className="w-screen bg-[#111111] text-white min-h-screen font-sans p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <h1 className="text-3xl font-bold">Transactions</h1>
                        <div className="bg-green-500/20 text-green-400 text-sm font-semibold px-2.5 py-1 rounded-full">
                            +6.15% <span className="text-gray-400">in the last 24 hours</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                        <div className="relative flex-grow sm:flex-grow-0">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search payments..."
                                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="relative">
                            <button className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700">
                                <span>Currency</span>
                                <span className="font-bold">USD</span>
                                <ChevronDown className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Transaction Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-xs text-gray-400 uppercase border-b border-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3">Transaction</th>
                                <th scope="col" className="px-6 py-3">Total Value</th>
                                {/* <th scope="col" className="px-6 py-3 text-right">Amount</th> */}
                                <th scope="col" className="px-6 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className="border-b border-gray-800 hover:bg-gray-800/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="font-semibold">{transaction.receiverName}</div>
                                                <div className="text-sm text-gray-400">{transaction.transaction_type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold">₹{transaction.amount}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end">
                                            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusClass(transaction.status)}`}></div>
                                            {transaction.status}
                                        </div>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}