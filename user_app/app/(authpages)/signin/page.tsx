'use client'
import { LoginForm } from "@/components/forms/loginForm";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    console.log(formData)
    setLoading(true);
    setError(null);
    const response = await signIn("credentials", {
      number: formData.get('phone')?.toString() || "",
      password: formData.get('password')?.toString() || "",
      redirect: false
    });
    setLoading(false);
    if(response?.error){
      setError("Invalid Phone number or Password");
    }else{
      router.push('/dashboard');
    }

  }
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-accent text-primary-foreground flex size-6 items-center justify-center rounded-md p-1">
              <img
                src='s_logo.svg'
              ></img>
            </div>
            Payments Made Simple
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm onSubmit={handleSubmit} loading={loading} />
            <div className="flex text-destructive justify-center">
              <span>{error}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1756227584303-f1400daaa69d?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  )
}
