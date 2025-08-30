import { Sidebar } from "@/components/ui/sidebar"
import AppBarHeader from "./appBarHeader"
import AppBarFooter from "./appBarFooter"
import AppBarContent from "./appBarContent"

export function AppSidebar() {
    

  return (
    <Sidebar collapsible="icon">
      <AppBarHeader />
      <AppBarContent />
      <AppBarFooter/>
    </Sidebar>
  )
}