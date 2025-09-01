import BalanceCard from "@/components/widget/balanceCard";



export default function(){
    return <div className="w-full h-screen flex justify-center items-center dark:bg-[url('https://i.pinimg.com/736x/93/c5/80/93c5807120ad42b4c3fbd1c67a35bf9e.jpg')] bg-cover bg-center 
    bg-[url('https://i.pinimg.com/736x/9d/80/91/9d80917cfa80bc969b5914b8f2e0ae99.jpg')] ">
            <BalanceCard balance={200000}/>
        </div>
}