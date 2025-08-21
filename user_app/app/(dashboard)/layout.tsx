'use client'
import SideBar from "@/components/sideBarComp";
import { JSX, useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { NavItem } from "@/components/sideBarComp";
import { Wallet, ArrowRightLeft, Bell, Receipt, HelpCircle, Settings, LogOut } from "lucide-react";
import { getUserNotificationsCount } from "@/lib/actions/notificationAction";
import PopOverNotification from "@/components/utilUi/popOver";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {

  const { data: session, status } = useSession()
  const [nCount, setnCount] = useState<number | undefined>(0)
  const fullname = session?.user?.name || "User"

  const router = useRouter()

  useEffect(() => {
    // Initial fetch
    fetchNotificationCount();

    // Set up polling interval (every 30 seconds)
    const interval = setInterval(() => {
      fetchNotificationCount();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [session?.user]);


  const fetchNotificationCount = async () => {
    if (status === "authenticated" && session?.user?.id) {
      try {
        const count = await getUserNotificationsCount(session.user.id);
        if (count.success) {
          setnCount(count.data);
        }
      } catch (error) {
        console.error("Failed to fetch notification count:", error);
      }
    }
  };

  return (
    <div className="flex">
      <SideBar fullname={fullname} navigationChildren={
        <>
          <NavItem icon={<Wallet size={20} />} onClick={()=>router.push('/dashboard')} >Portfolio</NavItem>
          <NavItem icon={<Receipt size={20} />} onClick={()=>router.push('/transactions')} >Transactions</NavItem>
          <PopOverNotification nCount={nCount}/>
          <NavItem icon={<ArrowRightLeft size={20} />} onClick={()=>router.push('/transfer')} >Transfer</NavItem>
        </>
      } footNavigationChild={
        <>
          <NavItem icon={<HelpCircle size={20} />}>Help</NavItem>
          <NavItem icon={<Settings size={20} />}>Settings</NavItem>
          <NavItem icon={<LogOut size={20} />} onClick={()=>signOut()}>Sign Out</NavItem>
        </>
      } />
      {children}
    </div>
  );
}