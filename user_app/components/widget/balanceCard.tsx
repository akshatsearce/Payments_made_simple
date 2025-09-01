import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, Cpu, Wifi } from "lucide-react";

export default function BalanceCard({ balance }: { balance: number }) {
    return (
        <Card>
            <CardContent className="">
                <div className="flex flex-col gap-8 items-center md:flex-row">
                    <div className="flex flex-col items-center gap-2 md:items-start">
                        <span className="text-xs">Your current balance</span>
                        <h1 className="font-bold text-5xl">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
                        <div className="flex gap-4 py-2">
                            <Link href="/transactions" passHref>
                                <Button variant="ghost">
                                    <ArrowUp className="mr-2 h-4 w-4" /> Send
                                </Button>
                            </Link>
                            <Link href="/transactions" passHref>
                                <Button variant="ghost">
                                    <ArrowDown className="mr-2 h-4 w-4" /> Receive
                                </Button>
                            </Link>
                        </div>
                        <div className="flex gap-8">
                            <div className="flex flex-col items-center md:items-start">
                                <h3 className="text-xs text-muted-foreground">Income</h3>
                                <span className="text-base">₹{(balance * 0.4).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex flex-col items-center md:items-start">
                                <h3 className="text-xs text-muted-foreground">Outcome</h3>
                                <span className="text-base">₹{(balance * 0.3).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-64 h-40 bg-yellow-400 rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-lg">
                        {/* Top section of the card */}
                        <div className="flex justify-between items-start">
                            <div className="text-black">
                                <p className="text-xs font-semibold font-mono tracking-wider">NU.FINANCE | DEBIT</p>
                            </div>
                            <Cpu size={28} className="text-black opacity-80" />
                        </div>

                        {/* Abstract decorative elements */}
                        <div className="absolute w-28 h-10 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-yellow-300"></div>
                        <div className="absolute w-20 h-16 bg-red-500/80 -bottom-4 -left-4 rounded-lg transform -skew-x-12"></div>
                        <div className="absolute w-16 h-10 bg-blue-500/80 -bottom-2 right-2 rounded-md"></div>
                        <div className="absolute w-5 h-5 bg-green-400/80 rounded-full bottom-9 right-20"></div>

                        {/* Bottom section of the card */}
                        <div className="flex justify-between items-end w-full">
                            <div className="flex items-center space-x-1">
                                <Wifi size={24} className="text-black" />
                                <span className="text-xl text-black font-bold rotate-90">))</span>
                            </div>
                            <p className="text-black font-mono text-sm">
                                <span>&bull;</span>9867
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>

        </Card>
    )
}