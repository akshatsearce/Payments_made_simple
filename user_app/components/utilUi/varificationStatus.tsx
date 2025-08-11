"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge"
import { Loader2, CheckCircle, XCircle, SearchCheck } from "lucide-react";
import VarifyUserAction from "@/lib/actions/varifyUser";

type VerificationStatus = "idle" | "loading" | "success" | "error";

interface VarifyUserActionProp {
    number: string
}

export default function VerifiableBadge({ number }: VarifyUserActionProp) {
    const [status, setStatus] = useState<VerificationStatus>("idle");
    const [name, setName] = useState<string | null>(null)

    const handleVerify = async () => {
        // 1. Set status to loading
        setStatus("loading");

        // 2. Simulate an API call (e.g., 1.5 seconds)
        const response = await VarifyUserAction(number)

        if (response.status === 200) {
            setStatus("success")
            setName(response.msg)

        } else {
            setName(null)
            setStatus("error")
        }
    };

    const badgeContent = {
        idle: {
            icon: <SearchCheck className="mr-2 h-4 w-4" />,
            text: "Verify",
            className: "bg-zinc-600 hover:bg-gray-600",
        },
        loading: {
            icon: <Loader2 className="mr-2 h-4 w-4 animate-spin" />,
            text: "Verifying...",
            className: "bg-blue-500/80",
        },
        success: {
            icon: <CheckCircle className="mr-2 h-4 w-4" />,
            text: "Verified",
            className: "bg-lime-300 hover:bg-green-700",
        },
        error: {
            icon: <XCircle className="mr-2 h-4 w-4" />,
            text: "Failed",
            className: "bg-red-600 hover:bg-red-700",
        },
    };

    const current = badgeContent[status];

    return (<>
        <Button
            onClick={handleVerify}
            disabled={status === "loading"}
            className={cn(
                "h-8 px-2 m-2 rounded text-black text-[12px] transition-all duration-300",
                current.className
            )}
        >
            {current.icon}
            {current.text}
        </Button>
        {name &&
            <Badge>{name}</Badge>}
    </>
    );
}