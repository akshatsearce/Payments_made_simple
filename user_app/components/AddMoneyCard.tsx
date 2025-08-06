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
import { ArrowDown, ArrowRight, Move, MoveUpRight } from "lucide-react"
import { useState } from "react"
import { p2pTransfer } from "@/lib/actions/p2pTransfer"

export default function AddMoney() {
  // In a real app, these would be managed with React state (e.g., useState)
  const [amount , setAmount] = useState(0)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")

  return (
      <Card className="w-full max-w-md bg-[#111111] border-slate-800 text-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Send Money in <span className="text-lime-300">3 Easy Steps!</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6">
          {/* You're Sending Section */}
          <div className="grid gap-2">
            <Label htmlFor="sending-amount" className="text-slate-400">
              You're Sending
            </Label>
            <div className="flex items-center rounded-md border border-slate-700 bg-[#0d1117] focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-[#161b22]">
              <span className="pl-3 text-slate-400">₹</span>
              <Input id="amount" type="number" placeholder="0" 
              onChange={(e)=>{setAmount(Number(e.target.value))}}
              className="flex-1 border-0 bg-transparent text-2xl font-bold text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"/>
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

          {/* Separator */}
          <div className="flex justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-[#0d1117]">
              <ArrowDown className="h-5 w-5 text-slate-400" />
            </div>
          </div>

          {/* Recipient Receives Section */}
          <div className="grid gap-2">
            <Label htmlFor="recipient-receives" className="text-slate-400">
              Recipient's Phone Number
            </Label>
            <div className="flex items-center rounded-md border border-slate-700 bg-[#0d1117]">
              <Input
                id="to"
                type="number"
                placeholder="90990xxxxx"
                onChange={(e)=>{setPhoneNumber(e.target.value)}}
                className="flex-1 border-0 bg-transparent text-2xl font-bold text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          {/* Send Money Button */}
          {error && (
              <div className="text-red-500 text-sm">{error}</div>
          )}
          <Button size="lg" 
          className="w-full bg-lime-300 text-lg font-semibold text-black hover:bg-blue-700"
          onClick={async()=>{
            try {
                const result = await p2pTransfer(phoneNumber, amount)
                setError(result?.message)
            } catch (err: any) {
                setError(err?.message || "Transfer failed. Please try again.")
            }
          }}
          >
            Send Money
            <div className="ml-2 flex items-center justify-center h-8 w-8 rounded-full bg-black">
              <MoveUpRight className="h-6 w-6 text-white" />
            </div>
          </Button>
        </CardContent>
      </Card>
  )
}