import { getUserNotifications , NotificationProp} from "@/lib/actions/notificationAction";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function (){

    const session = await getServerSession(NEXT_AUTH)
    const response = await getUserNotifications(session?.user?.id);

    return <div>
        {response.notifications && response.notifications.map((notification: NotificationProp) => (
            <div key={notification.id}>
                <p>{notification.message}</p>
                <p>{new Date(notification.createdAt).toLocaleString()}</p>
            </div>
        ))}
    </div>;
}