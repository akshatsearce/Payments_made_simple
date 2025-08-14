'use client'
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MoveUpRight } from "lucide-react"
import { useState } from "react"


import { toast } from "sonner"
import { offRamping } from "@/lib/actions/offRamping"
import PinDrawer from "./utilUi/pinDrawer"


export default function OffRampingCard() {
    const [amount, setAmount] = useState(0)
    const [bank, setBank] = useState<string>("")
    const [isloading, setIsLoading] = useState(false)
    const [pin , setPin] = useState("")


    const handleWithdrawMoney = async () => {
        try{
            if(!bank){
                throw new Error('Invalid bank selected')
            }
            setIsLoading(true)
            const response = await offRamping(amount, pin , bank)
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
                    Withdraw Money from <span className="text-lime-300">Wallet</span>
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
                <PinDrawer pin={pin} setPin={setPin} buttonHeader="Withdraw Money" onClick={handleWithdrawMoney} logo={<MoveUpRight className="h-6 w-6 text-white"/>} disabled={isloading} />
            </CardContent>
        </Card>
    )
}