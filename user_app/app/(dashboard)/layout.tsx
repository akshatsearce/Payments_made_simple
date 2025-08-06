'use client'
import SideBar from "@/components/sideBarComp";
import { JSX } from "react";
import { signOut, useSession } from "next-auth/react";
import { NavItem } from "@/components/sideBarComp";
import { Wallet , ArrowRightLeft , Bell ,Receipt, HelpCircle, Settings, LogOut} from "lucide-react";

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
        <NavItem icon={<Wallet size={20} />} href="/dashboard">Portfolio</NavItem>
        <NavItem icon={<Receipt size={20}  />} href="/transactions" >Transactions</NavItem>
        <NavItem icon={<Bell size={20} />} notificationCount={4} href="/transfer" >Notifications</NavItem>
        <NavItem icon={<ArrowRightLeft size={20} />} href="/transfer" >Transfer</NavItem>

        </>
      } footNavigationChild = {
        <>
        <NavItem icon={<HelpCircle size={20}/>}>Help</NavItem>
        <NavItem icon={<Settings size={20} />}>Settings</NavItem>
        <NavItem icon={<LogOut size={20} />} onClick={signOut}>Sign Out</NavItem>
        </>
      }/>
      {children}
    </div>
  );
}