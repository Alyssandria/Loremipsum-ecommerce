import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Product, SharedData } from "@/types"
import { usePage } from "@inertiajs/react"
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CartItem } from "./cartItem";
import { Skeleton } from "./ui/skeleton";

const Cart = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6 stroke-black"
        fill="none"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 6v1a3 3 0 1 0 6 0V6"
        />
        <path
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.611 3H8.39a4 4 0 0 0-3.946 3.342l-1.667 10A4 4 0 0 0 6.722 21h10.556a4 4 0 0 0 3.946-4.658l-1.667-10A4 4 0 0 0 15.612 3Z"
        />
    </svg>
)

export function Carts() {
    const { auth } = usePage<SharedData>().props;
    const [cartItems, setCartItems] = useState<Product[] | []>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

        if (auth.carts) {
            fetchData();
        }
    }, [auth.carts])
    return (
        <Sheet>
            <SheetTrigger className="cursor-pointer flex gap-2 items-center">
                <Cart />
                <span className="block px-2 bg-black font-bold text-white rounded-full">{auth.carts && auth.carts.length ? auth.carts.length : ""}</span>
            </SheetTrigger>
            <SheetContent className="p-6 overflow-auto scroll-smooth">
                <SheetHeader>
                    <SheetTitle>Carts</SheetTitle>
                </SheetHeader>
                <div className={cn("flex flex-col gap-3", isLoading ? "gap-12 justify-between" : "")}>
                    {
                        isLoading ?
                            Array.from({ length: 3 }).fill(0).map((_, i) => {
                                return (
                                    <div className="w-full h-20 flex gap-2" key={i}>
                                        <Skeleton className="w-1/2 h-full" />
                                        <div className="flex gap-3 flex-col w-full">
                                            <Skeleton className="h-full w-full" />
                                            <Skeleton className="h-full w-1/2" />
                                            <Skeleton className="w-8 h-full" />
                                        </div>
                                    </div>
                                )
                            }) :
                            !auth.carts || !auth.carts.length
                                ?
                                <span>No items in your cart</span>
                                :
                                cartItems.map((el) => {
                                    return (
                                        <CartItem item={el} key={el.id} />
                                    )
                                })
                    }
                </div>
            </SheetContent>
        </Sheet >
    )

}
