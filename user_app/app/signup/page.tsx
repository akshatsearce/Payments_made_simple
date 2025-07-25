"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function () {

    const router = useRouter()

    return (
        <div className="min-h-screen h-full flex justify-center ">
            <div className="flex flex-col justify-center">
                <Card className="w-full bg-white min-w-sm">
                    <CardHeader>
                        <CardTitle>Create a New Account</CardTitle>
                        <CardDescription>
                            Enter your details below to create your account
                        </CardDescription>
                        <CardAction>
                            <Button variant="link" onClick={()=>{router.push("/signin")}} >Sign In</Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="m@example.com"
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">Password</Label>
                                    </div>
                                    <Input id="password" type="password" required />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="fullname">Full Name</Label>
                                    </div>
                                    <Input id="fullname" type="name" required/>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full bg-slate-900 text-white">
                            Login
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}