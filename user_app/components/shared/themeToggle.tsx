"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react" // You might need to install lucide-react: npm install lucide-react
import { useTheme } from "next-themes"

export function ThemeToggleButton() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so we can check if the component has mounted.
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder or null to avoid hydration mismatch
    return (
        <div className="h-10 w-10 rounded-lg bg-muted animate-pulse"></div>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-5 right-5 z-50 p-2 rounded-full shadow-lg bg-white dark:bg-gray-800"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className=" h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
