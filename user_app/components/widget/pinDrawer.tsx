
import { Drawer , DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../ui/input-otp";

 
interface PinDrawerProps {
    pin: string,
    setPin: (pin: string) => void,
    buttonHeader: string,
    logo: React.ReactNode,
    onClick : ()=>{},
    disabled : boolean
}

export default function PinDrawer({pin, setPin , buttonHeader , logo , onClick, disabled}:PinDrawerProps){
    return <>
        <Drawer>
            <DrawerTrigger asChild>
                <Button 
                className="w-full bg-accent text-accent-foreground text-lg font-semibold"
                disabled={disabled}
                >{buttonHeader}
                    <div className="ml-2 flex items-center justify-center h-8 w-8 rounded-full bg-background">
                        {/* <logo className="h-6 w-6 text-white" /> */}
                        {logo}
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent className=" border-0">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Enter Pin</DrawerTitle>
                        <DrawerDescription>Enter your Security Pin</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-8 flex justify-center">
                    <InputOTP maxLength={6} value={pin} onChange={setPin} inputMode="numeric" pattern="\d*">
                        <InputOTPGroup>
                            <InputOTPSlot index={0} className="w-14 h-14 text-2xl"/>
                            <InputOTPSlot index={1} className="w-14 h-14 text-2xl"/>
                            <InputOTPSlot index={2} className="w-14 h-14 text-2xl"/>
                            <InputOTPSlot index={3} className="w-14 h-14 text-2xl"/>
                            <InputOTPSlot index={4} className="w-14 h-14 text-2xl"/>
                            <InputOTPSlot index={5} className="w-14 h-14 text-2xl"/>
                        </InputOTPGroup>
                    </InputOTP>
                    </div>
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button className="bg-accent text-accent-foreground font-bold " onClick={onClick}>Submit</Button>
                            {/* <Button variant="secondary" className="hover:bg-zinc-900">Cancel</Button> */}
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    </>
}
