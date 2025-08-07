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
import { SignUpAction } from "@/lib/actions/signUp"

export default function SignUp() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const formdata = {
        number: formData.get('number')?.toString() || "",
        name: formData.get('name')?.toString() || "",
        password: formData.get('password')?.toString() || ""
      }

      const response = await SignUpAction(formdata)

      if (response.status === 201) {
        setIsLoading(false)
        router.push("/signin")
      } else {
        // Convert error to string
        const errorMsg = typeof response.error === 'object' && response.error
          ? Object.values(response.error)
            .flat()
            .filter((err): err is string => err !== undefined)
            .join(', ') || "Signup failed"
          : response.error || "Signup failed"

        setError(errorMsg)
        setIsLoading(false)
      }
    } catch (err) {
      console.error('Signup error:', err)
      setError("Something went wrong")
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
                  <Label htmlFor="number">Phone Number</Label>
                  <Input
                    id="number"
                    name="number"
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
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
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