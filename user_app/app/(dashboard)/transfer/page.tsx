import OnRamp from "@/components/onRampCard";
import RequestMoney from "@/components/requestMoneyCard";
import SendMoney from "@/components/sendMoneyCard";

export default function(){
    return <div className="flex flex-col justify-around min-h-screen w-screen bg-gradient-to-br from-cyan-400 to-emerald-400 p-4">
        <div className="flex justify-evenly">
            <SendMoney/>
            <RequestMoney/>
        </div>
        <div className="flex justify-center"> 
            <OnRamp/>
        </div>
        
    </div>
}