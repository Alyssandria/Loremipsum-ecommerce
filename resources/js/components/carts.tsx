import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Product, SharedData } from "@/types"
import { router, usePage } from "@inertiajs/react"
import { ShoppingCartIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CartItem } from "./cartItem";

export function Carts() {
    const { auth } = usePage<SharedData>().props;
    const [cartItems, setCartItems] = useState<Product[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    if (!auth.carts) return null;

    useEffect(() => {
        const fetchData = async function() {
            setIsLoading(true);
            const response = await fetch(route('carts.index'), {
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!,
                }
            });

            if (!response.ok) {
                setCartItems([]);
                setIsLoading(true);
            }

            try {
                const json = await response.json();
                setCartItems(json);
                setIsLoading(false);
            } catch (e) {
                console.log(e);
            }
        }

        fetchData();
    }, [auth.carts])

    console.log(isLoading);
    return (
        <Sheet>
            <SheetTrigger className="cursor-pointer flex gap-2 items-center">
                <ShoppingCartIcon />
                <span className="text-xs">{auth.carts.length}</span>
            </SheetTrigger>
            <SheetContent className="p-6 overflow-auto scroll-smooth">
                <SheetHeader>
                    <SheetTitle>Carts</SheetTitle>
                </SheetHeader>
                <div className={cn("flex flex-col gap-3", isLoading ? "gap-12 h-1/2 justify-between" : "")}>
                    {
                        !auth.carts.length
                            ?
                            <span>No items in your cart</span>
                            :
                            cartItems.map((el) => {
                                return (
                                    <CartItem item={el} isLoading={isLoading} key={el.id} />
                                )
                            })
                    }
                </div>
            </SheetContent>
        </Sheet >
    )

}
