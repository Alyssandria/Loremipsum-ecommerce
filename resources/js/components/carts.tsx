import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { SharedData } from "@/types"
import { usePage } from "@inertiajs/react"
import { ShoppingCartIcon } from "lucide-react"
import { useEffect } from "react";

export function Carts() {
    const {auth} = usePage<SharedData>().props;

    if(!auth.carts) return null;

    useEffect(() => {
        const fetchData = async function() {
            const response = await fetch(route('carts.index'), {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN' :document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!,
                }
            });

            console.log(response);
        }
        fetchData();
    }, [])

    return (
        <Sheet>
            <SheetTrigger className="cursor-pointer flex gap-2 items-center">
                <ShoppingCartIcon />
                <span className="text-xs">{auth.carts.length}</span>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )

}
