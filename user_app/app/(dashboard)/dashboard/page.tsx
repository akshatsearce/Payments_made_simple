import BalanceCard from "@/components/widget/balanceCard";

export default function(){
    return <div className="w-full flex justify-center items-center">
        <BalanceCard balance={200000}/>
    </div>
}