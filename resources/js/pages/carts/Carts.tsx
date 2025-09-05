import { Skeleton } from "@/components/ui/skeleton";
import { cn, fetchWithHeaders, formatPrice } from "@/lib/utils";
import { Product, SharedData } from "@/types";
import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CartItem } from "@/components/cartItem";
import { Separator } from "@/components/ui/separator";
import { Link, router, usePage } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

export default function Carts() {
    const [carts, setCarts] = useState<null | Product[]>(null);
    const [selected, setSelected] = useState<Product[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [subTotal, setSubTotal] = useState<number>(0);
    const { auth } = usePage<SharedData>().props;

    const toggleSelect = (item: Product) => {
        if (!auth.carts) {
            return;
        }

        setSelected(prev => {
            return (
                prev.some(el => el.id === item.id) ? prev.filter(x => x.id !== item.id) : [...prev, item]
            )
        });
    }


    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            const response = await fetchWithHeaders(route("carts.json"));

            if (!response.ok) {
                // HANDLE ERRORS
                console.log(response);
            }

            const json = await response.json();
            setCarts(json);
            setLoading(false);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (!auth.carts) return;

        let total = 0;
        selected.forEach(el => {
            const quantity = auth.carts!.find(x => x.product_id === el.id)!.quantity;
            console.log(el.id, quantity);

            total += (el.price * quantity);

        });

        setSubTotal(total);

        console.log(selected);
    }, [selected]);

    return (
        <div className="flex flex-col gap-8">
            {
                isLoading ?
                    Array.from({ length: 3 }).fill(0).map((_, i) => {
                        return (
                            <div className="w-full h-40 flex gap-2" key={i}>
                                <Skeleton className="w-4/5 lg:w-1/2 h-full" />
                                <div className="flex gap-3 flex-col w-full">
                                    <Skeleton className="h-full w-full" />
                                    <Skeleton className="h-full w-1/2" />
                                    <Skeleton className="w-8 h-full" />
                                </div>
                            </div>
                        )
                    }) :
                    <div className={cn("flex flex-col gap-8", !carts || !carts.length ? "items-center" : "")}>
                        {!carts || !carts.length ?
                            <span>No Cart Items currently</span>
                            :
                            carts.map(el => {
                                return (
                                    <div key={el.id}>
                                        <CartItem item={el} showCheckout={Boolean(selected.length)} isSelected={selected.some(x => x.id === el.id)} setSelected={toggleSelect} />
                                        <Separator />
                                    </div>
                                )
                            })
                        }
                    </div>
            }

            <div className="border border-gray-200 p-4 rounded-2xl flex flex-col gap-6">
                <span className="block font-bold text-xl">Order Summary</span>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="block text-secondary/60 font-medium">Subtotal</span>
                        {isLoading ?
                            <Skeleton className="h-4 w-16 bg-[#F0F0F0] rounded-sm" />
                            :
                            <span className="block font-bold">{formatPrice(subTotal)}</span>
                        }
                    </div>
                    <Separator />
                </div>
                <div className="flex justify-between">
                    <span className="block text-lg">Total</span>
                    {isLoading ?
                        <Skeleton className="h-4 w-16 bg-[#F0F0F0] rounded-sm" />
                        :
                        <span className="block font-bold">{formatPrice(subTotal)}</span>
                    }
                </div>

                {
                    selected.length ?
                        <div className="w-full">
                            {isLoading ?
                                <Skeleton className="h-12 w-full bg-[#F0F0F0] rounded-sm" />
                                :
                                <Link href={route("checkout.show", { ids: selected.map(el => el.id) })} className="text-white w-full bg-black p-3 rounded-full flex items-center justify-center gap-2">
                                    Go to Checkout
                                    <ArrowRight className="w-5" />
                                </Link>
                            }
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
