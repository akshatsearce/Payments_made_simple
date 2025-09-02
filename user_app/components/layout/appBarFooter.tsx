import { useSession } from "next-auth/react";
import { SidebarFooter } from "../ui/sidebar";
import { NavUser } from "./navUser";

export default function AppBarFooter() {

    const { data: session, status } = useSession();

    return (
        <SidebarFooter>
            <NavUser user={{
            name: session?.user?.name || "unknown", 
            phone: session?.user?.number || "unknown",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D",
        }}/>
        </SidebarFooter>
    )
}