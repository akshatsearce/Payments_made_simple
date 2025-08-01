import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { NEXT_AUTH } from "@/lib/auth";

import { getServerSession } from "next-auth"

export default async function UserInfo({ balance }: { balance: number }){

  const session = await getServerSession(NEXT_AUTH);

    // Destructure user information from the session
  const { fullname, phone_number } = session.user;

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>User Info</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Full Name:</span>
              <span className="text-sm font-semibold">{fullname}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Phone Number:</span>
              <span className="text-sm font-semibold">{phone_number}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Balance:</span>
              <span className="text-sm font-semibold">
                ₹{balance.toFixed(2)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}