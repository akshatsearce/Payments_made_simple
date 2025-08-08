import OnRamp from "@/components/onRampCard";
import SendMoney from "@/components/sendMoneyCard";
import PinDrawer from "@/components/utilUi/pinDrawer";

export default function(){
    return <div className="flex items-center justify-evenly min-h-screen w-screen bg-gradient-to-br from-cyan-400 to-emerald-400 p-4">
        <SendMoney/>
        <OnRamp/>
    </div>
}