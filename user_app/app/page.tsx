"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { signIn, signOut } from "next-auth/react"

export default function Home() {

  const router = useRouter()

  return (<div>
  <nav className="bg-zinc-950 border-b border-gray-200 shadow-sm p-4 flex items-center justify-between">
      {/* Top Left: Application Name */}
      <div className="text-2xl font-roboto font-bold text-white">
        SimplePay
      </div>

      {/* Top Right: Sign In and Sign Up Buttons */}
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={()=>{signIn()}}
          className="text-white hover:text-zinc-300"
        >
          Sign In
        </Button>
        <Button
          onClick={()=> {signOut()}}
          className="bg-white hover:bg-zinc-500 text-zinc-900 rounded-md"
        >
          Sign Out
        </Button>
      </div>
    </nav>
    <div className="text-7xl text-">
      Dashboard
    </div>
    </div>
  )
}
