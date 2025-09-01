import { SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export default function AppBarHeader() {

    const { state } = useSidebar()

    return (
        <SidebarHeader className="mt-2">
            <SidebarMenu>
                <SidebarMenuItem className="flex justify-center">
                    <SidebarMenuButton
                        size="lg"
                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                    >
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={"/s_logo.svg"} className="bg-accent p-1" />
                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">Pay Simple</span>
                        </div>
                        <div className="rounded-full bg-accent w-10 flex justify-center">
                            <span className="text-tiny font-bold text-accent-foreground">USER</span>
                        </div>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
    )
}