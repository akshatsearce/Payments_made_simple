'use client'

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"


export default function Providers({ children }: { children: React.ReactNode }) {
    return <SessionProvider>
        <ThemeProvider
            attribute="class" // This tells next-themes to apply the theme by adding a class to the <html> tag (e.g., class="dark")
            defaultTheme="system" // Sets the default theme based on the user's system preference
            enableSystem // Allows the theme to follow the system preference
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    </SessionProvider>
}