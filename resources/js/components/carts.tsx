import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Product, SharedData } from "@/types"
import { Link, usePage } from "@inertiajs/react"
import { ShoppingCartIcon } from "lucide-react"
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

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
                        isLoading ?
                            Array.from({ length: 3 }, () => 0).map((_, i) =>
                            (
                                <div className="w-full h-full flex gap-2" key={i}>
                                    <Skeleton className="w-1/2 h-full" />
                                    <div className="flex gap-3 flex-col w-full">
                                        <Skeleton className="h-full w-full" />
                                        <Skeleton className="h-full w-1/2" />
                                        <Skeleton className="w-8 h-full" />
                                    </div>
                                </div>
                            ))
                            :
                            cartItems.length === 0
                                ?
                                <span>No items in your cart</span>
                                :
                                cartItems.map((el) => {
                                    return (
                                        <Link className="flex gap-2" href={route('product.show', el.id)} key={el.id}>
                                            <img
                                                src={el.thumbnail}
                                                className="w-1/2 h-full"
                                            />
                                            <div className="flex flex-col gap-2">
                                                <p className="font-bold">{el.title}</p>
                                                <p>{el.category}</p>
                                                <p>{(auth.carts!.find((elem) => elem.product_id === el.id)!.quantity).toFixed(2)}</p>
                                                <p>{el.price * auth.carts!.find((elem) => elem.product_id === el.id)?.quantity!}</p>
                                            </div>
                                        </Link>
                                    )
                                })}
                </div>
            </SheetContent>
        </Sheet >
    )

}
