import RequestMoney from "@/components/widget/requestMoneyCard";
import SendMoney from "@/components/widget/sendMoneyCard";

export default function(){
    return (
        <div className="flex justify-evenly">
            <SendMoney/>
            <RequestMoney/>
        </div>
        
    )
}