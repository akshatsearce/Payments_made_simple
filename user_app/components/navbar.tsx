'use client' // This directive is correctly placed at the top

import { Button } from "./ui/button"
import { signOut, signIn, useSession } from "next-auth/react"
import Link from "next/link"; // Import Link for client-side navigation
import { useRouter } from "next/navigation";

export default function NavBar() {

    const { data: session, status } = useSession();
    const router = useRouter()
    return (
        <nav className="bg-zinc-950 border-b border-gray-200 shadow-sm p-4 flex items-center justify-between rounded-b-lg"> {/* Added rounded corners */}
            {/* Top Left: Application Name - wrapped in Link for navigation */}
            <Link href="/" className="text-2xl font-bold text-white hover:text-zinc-300 transition-colors duration-200">
                SimplePay {/* Consider adding a custom font if 'font-roboto' isn't globally defined */}
            </Link>

            {/* Top Right: Authentication Buttons / User Info */}
            <div className="flex items-center space-x-4">
                {/* Show a loading state while authentication status is being determined */}
                {status === "loading" && (
                    <p className="text-white text-md">Loading...</p>
                )}

                {/* Render when the user is authenticated */}
                {status === "authenticated" && session.user && (
                    <>
                        {/* Display user's full name or email */}
                        <span className="text-white text-md font-medium">
                            Welcome, {session.user?.fullname || "User"}!
                        </span>
                        {/* Sign Out Button */}
                        <Button
                            onClick={() => { router.push("/dashboard") }}
                            className="bg-white hover:bg-zinc-200 text-zinc-900 rounded-md px-4 py-2 shadow-sm transition-colors duration-200"
                        >
                            Dashboard
                        </Button>
                        <Button
                            onClick={() => { signOut() }}
                            className="bg-white hover:bg-zinc-200 text-zinc-900 rounded-md px-4 py-2 shadow-sm transition-colors duration-200"
                        >
                            Sign Out
                        </Button>
                    </>
                )}

                {/* Render when the user is unauthenticated */}
                {status === "unauthenticated" && (
                    <>
                        {/* Sign In Button */}
                        <Button
                            variant="ghost" // Assuming 'ghost' variant provides a transparent background
                            onClick={() => { signIn() }}
                            className="text-white hover:text-zinc-300 hover:bg-zinc-800 rounded-md px-4 py-2 transition-colors duration-200"
                        >
                            Sign In
                        </Button>
                        {/* Sign Up Button - wrapped in Link for navigation */}
                        <Link href="/signup"> {/* Adjust '/signup' to your actual sign-up page route */}
                            <Button
                                className="bg-white hover:bg-zinc-200 text-zinc-900 rounded-md px-4 py-2 shadow-sm transition-colors duration-200"
                            >
                                Sign Up
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}