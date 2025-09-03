import { SearchByName, SearchByPhone } from "@/lib/actions/searchAction"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

export default async function SearchTable({query}:{query : string}) {

    // const users = await SearchByName(query)
    const users = await SearchByPhone(query)


    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone No.</TableHead>
                <TableHead>Email</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {users.data?.map((user) => (
                <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.number}</TableCell>
                    <TableCell>{user.email}</TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}