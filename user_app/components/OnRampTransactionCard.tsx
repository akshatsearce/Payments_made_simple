import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming shadcn/ui Card components

// Define a more specific type for transaction status
interface TransactionProp {
  id: number;
  amount: number;
  transaction_type: string;
  status: string;
  senderName: string;
  receiverName: string;
}

interface OnRampTransactionsProps {
  transactions: TransactionProp[];
}

export const OnRampTransactions = ({ transactions }: OnRampTransactionsProps) => {
  if (!transactions.length) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>No recent transactions found.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            It looks like you haven't made any transactions yet.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest transactions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {transactions.map((t) => (
          <div
            key={t.id} // Using transaction id as key for better React performance
            className="flex justify-between items-center pb-2 border-b last:border-b-0"
          >
            <div className="flex flex-col">
              {/* Transaction Type and Status */}
              <div className="text-sm font-medium text-gray-800">
                {t.transaction_type} of ₹{t.amount / 100}{" "}
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
                    ${t.status === "COMPLETED" ? "bg-green-100 text-green-800" : ""}
                    ${t.status === "PENDING" ? "bg-blue-100 text-blue-800" : ""}
                    ${t.status === "FAILED" ? "bg-red-100 text-red-800" : ""}
                  `}
                >
                  {t.status}
                </span>
              </div>
              {/* Sender and Receiver */}
              <div className="text-xs text-gray-500 mt-1">
                From {t.senderName} to {t.receiverName}
              </div>
            </div>
            <div className="flex flex-col items-end">
              {/* Amount */}
              <div className="text-base font-semibold text-green-600">
                {t.transaction_type === "TOPUP" ? "+" : "-"} ₹{t.amount / 100}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};