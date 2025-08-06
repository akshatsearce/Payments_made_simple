import AddMoney from "@/components/addMoneyCard";
import OnRamp from "@/components/onRampCard";

export default function(){
    return <div className="flex items-center justify-evenly min-h-screen w-screen bg-gradient-to-br from-cyan-400 to-emerald-400 p-4">
        <AddMoney/>
        <OnRamp/>
    </div>
}