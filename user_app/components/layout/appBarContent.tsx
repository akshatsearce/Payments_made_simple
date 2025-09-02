import { Wallet, Search, Settings, ArrowLeftRight, Receipt } from "lucide-react"
import { SidebarContent, SidebarGroup, SidebarMenuItem,SidebarMenuButton, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar"
import Link from "next/link"

export default function AppBarContent(){

    const items = [
  {
    title: "Portfolio",
    url: "/dashboard",
    icon: Wallet,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: Receipt,
  },
  {
    title: "Transfer",
    url: "#",
    icon: ArrowLeftRight,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },

]

    return (
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>Application</SidebarGroupLabel>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {items.map((item) => (
                            <SidebarMenuItem key={item.title} className="flex justify-center">
                                <SidebarMenuButton asChild>
                                    <Link href={item.url} className="h-10">
                                        <item.icon className="h-6 w-6"/>
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}
