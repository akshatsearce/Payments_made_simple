'use client'
import { AppSidebar } from "@/components/layout/appBar";
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