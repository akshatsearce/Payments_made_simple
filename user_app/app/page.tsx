import DataTableDemo from "@/components/datatable";
import NavBar from "@/components/navbar";
import { NEXT_AUTH } from "@/lib/auth";
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@radix-ui/react-dropdown-menu";

export default async function Home() {

  const session = await getServerSession(NEXT_AUTH)

  if (!session || !session.user) {
    redirect('/signin');
  }

  const info = prisma.user.addre
  return (<div>
    </div>
  )
}
