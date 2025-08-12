'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, MoveDownLeft } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CreateOnRampTransaction } from "@/lib/actions/onRampRequest"
import { toast } from "sonner"




export default function OnRamp() {
    const [amount, setAmount] = useState(0)
    const [bank, setBank] = useState<string | null>(null)
    const [isloading, setIsLoading] = useState(false)


    const handleAddMoney = async () => {
        try{
            if(!bank){
                throw new Error('Invalid bank selected')
            }
            setIsLoading(true)
            const response = await CreateOnRampTransaction(bank, amount)
            if(response.status!= 200){
                throw new Error(`${response.message}`)
            }
            toast('Money will soon be credited to your wallet.')

        }catch(e){
            toast(`Something went wrong. ${e}`)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full max-w-md bg-[#111111] border-slate-800 text-slate-50">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Add Money to <span className="text-lime-300">Wallet</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                {/* You're Sending Section */}
                <div className="grid gap-2">
                    <Label htmlFor="sending-amount" className="text-slate-400">
                        Recharge
                    </Label>
                    <div className="flex items-center rounded-md border border-slate-700 bg-[#0d1117] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-[#161b22]">
                        <span className="pl-3 text-slate-400">₹</span>
                        <Input id="amount" type="number" placeholder="0"
                            onChange={(e) => { setAmount(Number(e.target.value)) }}
                            className="flex-1 border-0 bg-transparent text-2xl font-bold text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <Select defaultValue="INR">
                            <SelectTrigger className="w-[110px] border-0 border-l border-slate-700 bg-transparent text-base font-medium text-white focus:ring-0 focus:ring-offset-0 rounded-l-none">
                                <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#161b22] border-slate-700 text-white">
                                <SelectItem value="INR">🇮🇳 INR</SelectItem>
                                <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                                <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                {/* Recipient Receives Section */}
                <div className="grid gap-2">
                    <Label htmlFor="recipient-receives" className="text-slate-400">
                        Recipient's Phone Number
                    </Label>
                    <div className="flex items-center rounded-md border border-slate-700 bg-[#0d1117]">
                        <Select onValueChange={setBank}>
                            <SelectTrigger className="w-full flex-1 border-0 bg-transparent text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0">
                                <SelectValue placeholder="Bank" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#161b22] border-slate-700 text-white">
                                <SelectItem value="Axis">Axis</SelectItem>
                                <SelectItem value="HDFC">HDFC</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Send Money Button */}
                <Button size="lg"
                    className="w-full bg-lime-300 text-lg font-semibold text-black hover:bg-indigo-600"
                    onClick={handleAddMoney}
                    disabled={isloading || amount <= 0 || !bank}
                >
                    Add Money
                    <div className="ml-2 flex items-center justify-center h-8 w-8 rounded-full bg-black">
                        {isloading ? (
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                        ) : (
                            <MoveDownLeft className="h-6 w-6 text-white" />
                        )}
                    </div>
                </Button>
            </CardContent>
        </Card>
    )
}