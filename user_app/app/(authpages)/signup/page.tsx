"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
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
import { useState } from "react"
import axios from "axios"

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const phone_number = formData.get("phone_number")?.toString()
    const password = formData.get("password")?.toString()
    const fullname = formData.get("fullname")?.toString()

    try {
      const response = await axios.post("/api/signup", {
        phone_number,
        password,
        fullname,
      })

      // Redirect to signin page after successful signup
      router.push("/signin")
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.errors?.phone_number ||
        err.response?.data?.errors?.server ||
        "Signup failed"
      setError(errorMsg)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen h-full flex justify-center">
      <div className="flex flex-col justify-center">
        <Card className="w-full bg-white min-w-sm">
          <CardHeader>
            <CardTitle>Create a New Account</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
            <CardAction>
              <Button variant="link" onClick={() => router.push("/signin")}>
                Sign In
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    name="phone_number"
                    type="number"
                    placeholder="+1234567890"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fullname">Full Name</Label>
                  <Input
                    id="fullname"
                    name="fullname"
                    type="text"
                    required
                  />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <CardFooter className="flex-col gap-2 mt-6">
                <Button
                  type="submit"
                  className="w-full bg-slate-900 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}