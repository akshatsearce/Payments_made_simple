'use client'
import { useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import PinDrawer from "./pinDrawer";
import { MoveUpRight } from "lucide-react";
import { p2pRequestTransfer } from "@/lib/actions/p2pTransfer";
import { toast } from "sonner";

interface RequestActionButtonProps {
    transactionId: number,
    toUserName: string,
    amount: number
}

export function RequestActionButton({ transactionId, toUserName, amount }: RequestActionButtonProps) {
    const [pin, setPin] = useState("");
    const [isloading, setIsloading] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState(false);

    const handleSubmit = async () => {
        setIsloading(true);
        try {
            const result = await p2pRequestTransfer(transactionId, pin);
            if (result?.status === 200) {
                toast("Transaction successful!",{
                    action:{
                        label: "ok",
                        onClick: ()=>{window.location.reload()}
                    }
                });
                setAlertOpen(false);
                setPin("");
            } else {
                toast(result?.message || "Transaction failed.", {
                    action:{
                        label: "ok",
                        onClick: ()=>{window.location.reload()}
                    }
                });
            }
        } catch (e) {
            toast("Something went wrong. Please try again.",{
                    action:{
                        label: "ok",
                        onClick: ()=>{window.location.reload()}
                    }
                });
        } finally {
            // window.location.reload();
            setAlertOpen(false)
            setIsloading(false);
        }
    };

    return (
        <>
            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger asChild>
                    <Button onClick={() => setAlertOpen(true)} className="bg-white text-black">Review Request</Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[#111111] text-white border-0">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to send <span className="text-lime-300">₹{amount}</span>  to {toUserName} </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will transfer the money to the requestor.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col">
                        <div className="flex w-full gap-2">
                            <AlertDialogCancel asChild>
                                <Button className="w-1/2 bg-red-500">Cancel</Button>
                            </AlertDialogCancel>
                            <div className="w-1/2">
                                <PinDrawer
                                    disabled={isloading}
                                    onClick={handleSubmit}
                                    pin={pin}
                                    setPin={setPin}
                                    buttonHeader="Enter Pin"
                                    logo={<MoveUpRight className="h-6 w-6 text-white" />}
                                />
                            </div>
                        </div>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            
        </>
    );
}