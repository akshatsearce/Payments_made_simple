import { Sidebar, useSidebar } from "@/components/ui/sidebar"
import AppBarHeader from "./appBarHeader"
import AppBarFooter from "./appBarFooter"
import AppBarContent from "./appBarContent"
import { Button } from "../ui/button"

export function AppSidebar() {

  const {open, setOpen} = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <AppBarHeader />
      <AppBarContent />
      {/* <Button onClick={() => setOpen(!open)}>Toggle</Button> */}
      <AppBarFooter />
    </Sidebar>
  )
}