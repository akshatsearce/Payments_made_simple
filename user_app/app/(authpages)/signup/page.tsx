'use client'
import { SignupForm } from "@/components/forms/signupForm";
import { SignUpAction } from "@/lib/actions/signUp";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { set } from "zod";

export default function SignupPage() {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formdata = {
            number: formData.get('phone')?.toString() || "",
            name: formData.get('name')?.toString() || "",
            password: formData.get('password')?.toString() || "",
            pin: formData.get('pin')?.toString() || ""
        }
        console.log(formdata)
        setLoading(true);
        const response = await SignUpAction(formdata);
        setLoading(false);
        if (response.status === 201) {
            router.push('/signin')
        } else {
            setError(response.error || "Unknown error")
        }

    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                            <img
                                src='s_logo.svg'
                                className="bg-background"
                            ></img>
                        </div>
                        Payments Made Simple
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <SignupForm onSubmit={handleSubmit} loading={loading} />
                        <div className="flex text-destructive justify-center">
                            <span>{error}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <img
                    src="https://images.unsplash.com/photo-1755097100741-2dd79bfce378?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzNnx8fGVufDB8fHx8fA%3D%3D"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}