'use client'
import SideBar from "@/components/SideBarComponent";
import { JSX } from "react";
import { useSession } from "next-auth/react";
import { NavItem } from "@/components/SideBarComponent";
import { Wallet , ArrowRightLeft , Bell , LineChart , Newspaper, HelpCircle, Settings, LogOut} from "lucide-react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  const session = useSession()
  const fullname = session.data?.user?.name || "User"

  return (
    <div className="flex">
      <SideBar fullname={fullname} navigationChildren = {
        <>
        <NavItem icon={<Wallet size={20} />} active>Portfolio</NavItem>
        <NavItem icon={<ArrowRightLeft size={20} />} hasAction>Transactions</NavItem>
        <NavItem icon={<Bell size={20} />} notificationCount={4}>Notifications</NavItem>
        <NavItem icon={<LineChart size={20} />}>Market</NavItem>
        <NavItem icon={<Newspaper size={20} />}>News</NavItem> 
        </>
      } footNavigationChild = {
        <>
        <NavItem icon={<HelpCircle size={20} />}>Help</NavItem>
        <NavItem icon={<Settings size={20} />}>Settings</NavItem>
        <NavItem icon={<LogOut size={20} />}>Sign Out</NavItem>
        </>
      }/>
      {children}
    </div>
  );
}