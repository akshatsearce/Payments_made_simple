'use client'
import { AppSidebar } from "@/components/layout/appBar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { JSX, useEffect, useState } from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element {

    return (
        <SidebarProvider>
            <AppSidebar/>
            <div className="flex flex-1 flex-col">
                {/* <header className="border-b h-14 flex items-center px-4">
                    <SidebarTrigger className="mr-4" />
                    <h1 className="font-semibold">Dashboard</h1>
                </header> */}
                <SidebarTrigger className="mr-4" />
                {/* <SidebarInset> */}
                    {children}
                {/* </SidebarInset> */}
            </div>
        </SidebarProvider>
    )

}