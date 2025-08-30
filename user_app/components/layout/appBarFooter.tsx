import { SidebarFooter } from "../ui/sidebar";
import { NavUser } from "./navUser";

export default function AppBarFooter() {
    return (
        <SidebarFooter>
            <NavUser user={{
            name: "shadcn",
            phone: "9099067145",
            avatar: "/avatars/shadcn.jpg",
        }}/>
        </SidebarFooter>
    )
}