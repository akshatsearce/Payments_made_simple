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
import { ArrowDown, MoveUpRight } from "lucide-react"
import { useState } from "react"
import { p2pTransfer } from "@/lib/actions/p2pTransfer"
import PinDrawer from "./pinDrawer"
import VerifiableBadge from "../shared/varificationStatus"

export default function SendMoney() {
  // In a real app, these would be managed with React state (e.g., useState)
  const [amount, setAmount] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isloading, setIsloading] = useState<boolean>(false)
  const [pin, setPin] = useState("")

  const handelSubmit = async () => {
    setError(null)
    setSuccess(null)
    setIsloading(true)

    const result = await p2pTransfer(phoneNumber, amount , pin)
    setIsloading(false)
    if (result.status === 200) {
      setSuccess(result.message)
    } else {
      setError(result.message)
    }

  }


  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Send Money in <span className="text-accent">3 Easy Steps!</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        {/* You're Sending Section */}
        <div className="grid gap-2">
          <Label htmlFor="sending-amount" className="text-muted-foreground">
            You're Sending
          </Label>
          <div className="flex items-center rounded-md border focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 ">
            <span className="pl-3">₹</span>
            <Input id="amount" type="number" placeholder="0"
              onChange={(e) => { setAmount(Number(e.target.value)) }}
              className="flex-1 border-0 text-2xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0" />
            <Select defaultValue="INR">
              <SelectTrigger className="w-[110px] border-0 border-l text-base font-medium focus:ring-0 focus:ring-offset-0 rounded-l-none">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="">
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
          <Label htmlFor="recipient-receives" className="text-muted-foreground">
            Recipient's Phone Number
          </Label>
          <div className="flex items-center rounded-md border">
            <Input
              id="to"
              type="number"
              placeholder="90990xxxxx"
              onChange={(e) => { setPhoneNumber(e.target.value) }}
              className="flex-1 border-0 text-2xl font-bold focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <VerifiableBadge number={phoneNumber}/>
          </div>
        </div>

        {/* Send Money Button */}
        {error && (
          <div className="text-destructive text-sm">{error}</div>
        )}
        {success && (
          <div className="text-constructive text-sm">{success}</div>
        )}
        <PinDrawer pin={pin} onClick={handelSubmit} setPin={setPin} buttonHeader="Send Money" disabled={isloading} logo={<MoveUpRight className="h-6 w-6 "/>} />
      </CardContent>
    </Card>
  )
}