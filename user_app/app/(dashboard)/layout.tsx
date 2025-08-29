'use client'
import { AppSidebar } from "@/components/layout/sideBar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { JSX, useEffect, useState } from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger />
            {children}
        </SidebarProvider>
    )

}