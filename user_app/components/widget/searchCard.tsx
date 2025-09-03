'use client'
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce'

export default function SearchCard() {

    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { replace } = useRouter()

    const handelSearch = useDebouncedCallback((term: string) => {
        console.log("searching.." + term)
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`)
    }, 300)

    return <div className="flex items-center gap-2 px-4">
        <Search />
        <Input
            id="search"
            name="search"
            placeholder="Search phone number"
            className=""
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => handelSearch(e.target.value)}
        />
    </div>
}