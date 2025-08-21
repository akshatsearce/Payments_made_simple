'use client'
import { Label } from "@radix-ui/react-dropdown-menu"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { ReactNode, useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { NavItem } from "../sideBarComp";
import { ArrowDownLeft, ArrowUpRight, Bell, Wallet } from "lucide-react";
import { getUserNotifications, getUserNotificationsCount, markNotificationAsRead } from "@/lib/actions/notificationAction";
import { get } from "axios";
import type { NotificationResponse, Notification } from "@/lib/actions/notificationAction";
import { useRouter } from "next/navigation";


const NotificationIcon = ({ direction }: { direction: Notification['content']['direction'] }) => {
    switch (direction) {
        case 'RECEIVE':
            return <ArrowDownLeft className="h-5 w-5 text-green-500" />;
        case 'SEND':
            return <ArrowUpRight className="h-5 w-5 text-red-500" />;
        case 'WALLET':
            return <Wallet className="h-5 w-5 text-sky-500" />;
        default:
            return <Bell className="h-5 w-5 text-gray-400" />;
    }
};

export default function PopOverNotification({ nCount ,open, onOpen , fetchNotificationCount }: { nCount: number | undefined  , open : boolean, onOpen: (open: boolean) => void, fetchNotificationCount: () => void}) {

    const [notifications, setNotifications] = useState<any[]>([]);
    const router = useRouter()

    const handleRead = async (notificationId: number) => {
        // Mark all notifications as read
        try {
            await markNotificationAsRead(notificationId)

            const response: NotificationResponse = await getUserNotifications();
            if (response.success && response.data) {
                setNotifications(response.data);
                await fetchNotificationCount()
            }
            
        }
        finally {
            router.refresh()
        }


    };

    useEffect(() => {
        if (open) {
            const fetchNotifications = async () => {
                const response: NotificationResponse = await getUserNotifications();
                if (response.success && response.data) {
                    setNotifications(response.data);
                }
            };
            fetchNotifications();
        }
    }, [open]);

    return <div>
        <Popover open={open} onOpenChange={onOpen}>
            <PopoverTrigger asChild>
                <div>
                    <NavItem icon={<Bell size={20} />} notificationCount={nCount}>
                        Notifications
                    </NavItem>
                </div>
            </PopoverTrigger>
            <PopoverContent
                className="w-90 border-white bg-[#111111] text-white shadow-lg p-0"
                align="start"
                side="right"
            >
                <div className="p-4">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                </div>

                {/* Scrollable Container */}
                <div className="max-h-[400px] overflow-y-auto">
                    {notifications.map((notification: Notification) => (
                        <div
                            key={notification.id}
                            className="flex items-center gap-4 p-4 border-t border-slate-700/60 hover:bg-slate-800/50 transition-colors"
                        // onClick={() => handleRead(notification.id)}
                        >
                            <div className="flex-shrink-0 mt-1">
                                <NotificationIcon direction={notification.content.direction} />
                            </div>
                            <div className="flex-grow">
                                <p className="text-lg text-white">₹{notification.content.amount}</p>
                                <p className="text-sm text-gray-200">{notification.content.message}</p>
                                <p className="text-xs font-bold text-white mt-1">{notification.type}</p>
                            </div>
                            <Button
                                variant='default'
                                size="icon"
                                className="ml-auto text-gray-400 hover:text-white cursor-pointer"
                                onClick={() => handleRead(notification.id)}
                            >Ok</Button>
                        </div>
                    ))}
                </div>

                <div className="p-2 text-center border-t border-slate-700/60">
                    <Button className="text-sm w-full text-lime-300 font-bold hover:bg-indigo-600">
                        Mark all as read
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    </div>
}