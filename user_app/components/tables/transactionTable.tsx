import GetAllTransaction from "@/lib/actions/getTransactions";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/lib/auth";
import { MoveDownLeft, MoveUpRight } from "lucide-react";
import { RequestActionButton } from "../widget/requestAction";


export default async function TransactionTable() {

    const transactions = await GetAllTransaction()
    const session = await getServerSession(NEXT_AUTH)

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'SUCCESS':
                return 'bg-constructive';
            case 'PROCESSING':
                return 'bg-yellow-500';
            case 'FAILURE':
                return 'bg-destructive';
            default:
                return 'bg-gray-500';
        }
    };

    return (
        <Table>
            <TableHeader className="sticky top-0 bg-background">
                <TableRow className="h-12 text-xs">
                    <TableHead className="text-muted-foreground">TRANSACTION</TableHead>
                    <TableHead className="text-muted-foreground">AMOUNT</TableHead>
                    <TableHead className="text-muted-foreground">TYPE</TableHead>
                    <TableHead className="text-muted-foreground">PROVIDER</TableHead>
                    <TableHead className="text-muted-foreground">DATE</TableHead>
                    <TableHead className="text-right text-muted-foreground">STATUS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {transactions.map((transaction) => (
                    <TableRow key={`${transaction.transaction_type}-${transaction.id}`} className="h-14">
                        <TableCell>
                            <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2">
                                                {transaction.direction ? (
                                                        <MoveDownLeft className="text-constructive" />
                                                    ) : (
                                                        <MoveUpRight className="text-destructive" />
                                                    )}
                                                <div className="font-semibold">
                                                    {transaction.transaction_type === 'P2P'
                                                        ? (transaction.direction ? transaction.senderName : transaction.receiverName)
                                                        : transaction.senderName}
                                                </div>
                                            </div>
                                        </div>
                        </TableCell>
                        <TableCell className={`${
                            transaction.direction ? 'text-constructive' : 'text-destructive'
                        }`}>₹{transaction.amount}</TableCell>
                        <TableCell>{transaction.transaction_type}</TableCell>
                        <TableCell>{transaction.provider}</TableCell>
                        <TableCell>{new Date(transaction.timestamp).toLocaleDateString('en-IN', {
                                            day: 'numeric',
                                            month: 'short',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}</TableCell>
                        <TableCell className="">
                            <div className="flex items-center justify-end gap-4">
                                            <div className="flex items-center">
                                            <div className={`h-2.5 w-2.5 rounded-full mr-2 ${getStatusClass(transaction.status)}`}></div>
                                            <span className="text-muted-foreground">{transaction.status}</span>
                                            </div>
                                            {transaction.status === 'PROCESSING' && (transaction.transaction_type=== 'P2P') && (transaction.senderId == session?.user?.id) && (
                                            <RequestActionButton transactionId={transaction.id} amount={transaction.amount} toUserName={transaction.receiverName}/>
                                            )}
                                        </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}