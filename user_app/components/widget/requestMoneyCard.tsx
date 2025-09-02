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
import { ArrowDown, MoveDownLeft } from "lucide-react"
import { useState } from "react"
import VerifiableBadge from "../shared/varificationStatus"
import { MakeRequest } from "@/lib/actions/makeRequest"
import { Button } from "@/components/ui/button"

export default function RequestMoney() {
    // In a real app, these would be managed with React state (e.g., useState)
    const [amount, setAmount] = useState(0)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isloading, setIsloading] = useState<boolean>(false)

    const handelSubmit = async () => {
        setError(null)
        setSuccess(null)
        setIsloading(true)

        const result = await MakeRequest(phoneNumber, amount)
        setIsloading(false)
        if (result.status === 200) {
            setSuccess(result.message)
        } else {
            setError(result.message)
        }

    }


    return (
        <Card className="w-full max-w-md ">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                    Request Money in <span className="text-accent">3 Easy Steps!</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
                {/* You're Sending Section */}
                <div className="grid gap-2">
                    <Label htmlFor="sending-amount" className="text-muted-foreground">
                        You'll Recieve
                    </Label>
                    <div className="flex items-center rounded-md border focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-[#161b22]">
                        <span className="pl-3 text-muted-foreground">₹</span>
                        <Input id="amount" type="number" placeholder="0"
                            onChange={(e) => { setAmount(Number(e.target.value)) }}
                            className="flex-1 border-0 text-2xl font-bold  focus-visible:ring-0 focus-visible:ring-offset-0" />
                        <Select defaultValue="INR">
                            <SelectTrigger className="w-[110px] border-0 border-l text-base font-medium focus:ring-0 focus:ring-offset-0 rounded-l-none">
                                <SelectValue placeholder="Currency" />
                            </SelectTrigger>
                            <SelectContent className="text-muted-foreground">
                                <SelectItem value="INR">🇮🇳 INR</SelectItem>
                                <SelectItem value="EUR">🇪🇺 EUR</SelectItem>
                                <SelectItem value="GBP">🇬🇧 GBP</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Separator */}
                <div className="flex justify-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border">
                        <ArrowDown className="h-5 w-5" />
                    </div>
                </div>

                {/* Recipient Receives Section */}
                <div className="grid gap-2">
                    <Label htmlFor="recipient-receives" className="">
                        Sender's Phone Number
                    </Label>
                    <div className="flex items-center rounded-md border ">
                        <Input
                            id="to"
                            type="number"
                            placeholder="90990xxxxx"
                            onChange={(e) => { setPhoneNumber(e.target.value) }}
                            className="flex-1 border-0 bg-transparent text-2xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
                        />
                        <VerifiableBadge number={phoneNumber} />
                    </div>
                </div>

                {error && (
                    <div className="text-destructive text-sm">{error}</div>
                )}
                {success && (
                    <div className="text-constructive text-sm">{success}</div>
                )}
                <Button 
                    className="w-full bg-accent text-lg text-accent-foreground font-semibold"
                    disabled={isloading}
                    onClick={handelSubmit}
                >Request Money
                    <div className="ml-2 flex items-center justify-center h-8 w-8 rounded-full bg-background">
                        <MoveDownLeft className="className=h-6 w-6 text-primary" />
                    </div>
                </Button>
            </CardContent>
        </Card>
    )
}