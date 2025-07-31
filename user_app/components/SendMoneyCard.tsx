"use client"
import { Label } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import { p2pTransfer } from "@/lib/actions/p2pTransfer";

export default function(){

    const [amount, setAmount] = useState(0)
    const [number , setNumber] = useState("")
    const [error, setError] = useState<string | null>(null)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send Money</CardTitle>
                <CardDescription>
                    Easily transfer funds to friends, family, and businesses.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label>Send To</Label>
                        <Input id="to" type="number" placeholder="9876543210" onChange={(e)=>{setNumber(e.target.value)}}/>
                    </div>
                    <div className="grid gap-2">
                        <Label>Amount</Label>
                        <Input id="amount" type="number" placeholder="100" onChange={(e)=>{setAmount(Number(e.target.value))}}/>
                    </div>
                    {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                    )}
                    <Button onClick={async()=>{
                        try {
                            const result = await p2pTransfer(number, amount)
                            setError(result?.message)
                        } catch (err: any) {
                            setError(err?.message || "Transfer failed. Please try again.")
                        }
                    }}>
                        Send Money
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}