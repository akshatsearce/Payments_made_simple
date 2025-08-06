import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import {
  ArrowUp,
  ArrowDown,
  Lock,
  Gauge,
  KeyRound,
  Settings,
  Info,
  MoreHorizontal,
  Wifi,
  Cpu,
} from "lucide-react"

interface ViewBalanceProps {
    balance : number
}

export default function ViewBalance({balance}: ViewBalanceProps) {
    return (
    
      <Card className="w-full max-w-2xl bg-[#111111] text-white border-gray-800 rounded-2xl shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start">
            {/* Left Side: Balance Info */}
            <div className="flex-1 pr-0 md:pr-8 mb-6 md:mb-0">
              {/* <h1 className="text-5xl font-bold mb-4">₹{balance.toFixed(2)}</h1> */}
              <h1 className="text-5xl font-bold mb-4">₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h1>
              <div className="flex space-x-3 mb-6">
                <Link href="/transfer" passHref>
                <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                    <ArrowUp className="mr-2 h-4 w-4" /> Send
                </Button>
                </Link>
                <Link href='/transfer' passHref>
                <Button variant="secondary" className="bg-gray-800 hover:bg-gray-700">
                  <ArrowDown className="mr-2 h-4 w-4" /> Request
                </Button>
                </Link>
              </div>
              <div className="flex space-x-12">
                <div>
                  <p className="text-sm text-gray-400">Income</p>
                  <p className="text-lg font-semibold">₹1,725.82</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Outcome</p>
                  <p className="text-lg font-semibold">₹532.73</p>
                </div>
              </div>
            </div>

            {/* Right Side: Debit Card Visual */}
            <div className="relative w-64 h-40 bg-yellow-400 rounded-xl p-4 flex flex-col justify-between overflow-hidden shadow-lg">
              {/* Top section of the card */}
              <div className="flex justify-between items-start">
                <div className="text-black">
                  <p className="text-xs font-semibold font-mono tracking-wider">NU.FINANCE | DEBIT</p>
                </div>
                <Cpu size={28} className="text-black opacity-80" />
              </div>
              
              {/* Abstract decorative elements */}
              <div className="absolute w-28 h-10 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-dashed border-yellow-300"></div>
              <div className="absolute w-20 h-16 bg-red-500/80 -bottom-4 -left-4 rounded-lg transform -skew-x-12"></div>
              <div className="absolute w-16 h-10 bg-blue-500/80 -bottom-2 right-2 rounded-md"></div>
              <div className="absolute w-5 h-5 bg-green-400/80 rounded-full bottom-9 right-20"></div>

              {/* Bottom section of the card */}
              <div className="flex justify-between items-end w-full">
                <div className="flex items-center space-x-1">
                    <Wifi size={24} className="text-black" />
                    <span className="text-xl text-black font-bold rotate-90">))</span>
                </div>
                <p className="text-black font-mono text-sm">
                  <span>&bull;</span>9867
                </p>
              </div>
            </div>
          </div>
          
          <Separator className="bg-gray-700 my-6" />

          {/* Bottom Action Bar */}
          {/* <div className="flex justify-around items-center text-gray-400">
            <ActionButton icon={<Lock size={20} />} label="Lock" />
            <ActionButton icon={<Gauge size={20} />} label="Limits" />
            <ActionButton icon={<KeyRound size={20} />} label="PIN code" />
            <ActionButton icon={<Settings size={20} />} label="Settings" />
            <ActionButton icon={<Info size={20} />} label="Show Info" />
            <ActionButton icon={<MoreHorizontal size={20} />} />
          </div> */}
        </CardContent>
      </Card>
  )
}

// Helper component for the action buttons to avoid repetition
function ActionButton({ icon, label }: { icon: React.ReactNode; label?: string }) {
  return (
    <button className="flex flex-col items-center space-y-1 hover:text-white transition-colors duration-200">
      {icon}
      {label && <span className="text-xs">{label}</span>}
    </button>
  )
}