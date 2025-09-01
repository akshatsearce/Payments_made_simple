'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp"

export function SignupForm({
  className,
  loading,
  ...props
}: React.ComponentProps<"form"> & { loading: boolean }) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"><span className="text-accent">Create</span> new account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your Phone Number below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" type="tel" placeholder="123-456-7890" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" type="text" placeholder="John Doe" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" name="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="pin">PIN</Label>
          <InputOTP maxLength={6} id="pin" name="pin">
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-14 h-14 text-xl" />
              <InputOTPSlot index={1} className="w-14 h-14 text-xl" />
              <InputOTPSlot index={2} className="w-14 h-14 text-xl" />
              <InputOTPSlot index={3} className="w-14 h-14 text-xl" />
              <InputOTPSlot index={4} className="w-14 h-14 text-xl" />
              <InputOTPSlot index={5} className="w-14 h-14 text-xl" />
            </InputOTPGroup>
          </InputOTP>
        </div>
        <Button type="submit" className="w-full bg-accent" disabled={loading}>
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              Signing Up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </div>
      <div className="text-center text-sm">
        Already had an account?{" "}
        <a href="/signin" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  )
}
