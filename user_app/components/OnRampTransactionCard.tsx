import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"; // Assuming shadcn/ui Card components

// Define a more specific type for transaction status
type TransactionStatus = "Processing" | "Success" | "Failed" | "Pending";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: TransactionStatus; // Using the more specific type
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card className="w-full max-w-sm"> {/* Added max-width for consistency */}
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>No recent on-ramp transactions found.</CardDescription>
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
    <Card className="w-full max-w-sm"> {/* Added max-width for consistency */}
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest money additions.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4"> {/* Added spacing between transaction items */}
        {transactions.map((t, index) => (
          <div
            key={index} // Using index as key is okay if items don't change order or get added/removed frequently. A unique ID from the transaction object would be better if available.
            className="flex justify-between items-center pb-2 border-b last:border-b-0" // Add bottom border for separation, remove for last item
          >
            <div className="flex flex-col">
              {/* Transaction Type and Status */}
              <div className="text-sm font-medium text-gray-800">
                Received INR{" "}
                <span
                  className={`ml-1 px-2 py-0.5 rounded-full text-xs font-semibold
                    ${t.status === "Success" ? "bg-green-100 text-green-800" : ""}
                    ${t.status === "Processing" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${t.status === "Failed" ? "bg-red-100 text-red-800" : ""}
                    ${t.status === "Pending" ? "bg-blue-100 text-blue-800" : ""}
                  `}
                >
                  {t.status}
                </span>
              </div>
              {/* Provider and Date */}
              <div className="text-xs text-gray-500 mt-1">
                From {t.provider} on {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col items-end">
              {/* Amount */}
              <div className="text-base font-semibold text-green-600">
                + ₹{t.amount / 100} {/* Assuming amount is in paisa, convert to rupees */}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};