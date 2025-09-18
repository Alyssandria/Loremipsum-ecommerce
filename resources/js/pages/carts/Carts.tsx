import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import { type CartItemType, Product, SharedData } from "@/types";
import { ComponentProps, useEffect, useState } from "react"
import { CartItem } from "@/components/cartItem";
import { Separator } from "@/components/ui/separator";
import { Link, usePage } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

type CartsProps = {
    items: CartItemType[]
} & ComponentProps<"div">

export default function Carts({ items }: CartsProps) {
    const [carts, setCarts] = useState<CartItemType[]>(items);
    console.log(carts);
    const [selected, setSelected] = useState<Product[]>([]);
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
        if (!auth.carts) return;

        let total = 0;
        selected.forEach(el => {
            const quantity = auth.carts!.find(x => x.product_id === el.id)!.quantity;
            console.log(el.id, quantity);

            total += (el.price * quantity);

        });

        setSubTotal(total);

    }, [selected]);

    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            {
                <div className={cn("flex flex-col gap-8 w-full", !carts || !carts.length ? "items-center" : "")}>
                    {!carts.length ?
                        <span>
                            Your cart is empty
                            <Link href={route('products.index')}>
                                Shop Now
                            </Link>
                        </span>
                        :
                        carts.map(el => {
                            return (
                                <div key={el.product.id}>
                                    <CartItem item={el} showCheckout={Boolean(selected.length)} isSelected={selected.some(x => x.id === el.id)} setSelected={toggleSelect} />
                                    <Separator />
                                </div>
                            )
                        })
                    }
                </div>
            }

            <div className="border p-4 rounded-2xl flex flex-col gap-6 w-1/2 h-fit">
                <span className="block font-bold text-xl">Cart Summary</span>
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="block text-secondary/60 font-medium">Subtotal</span>
                    </div>
                    <Separator />
                </div>
                <div className="flex justify-between">
                    <span className="block text-lg">Total</span>
                    <span className="block font-bold">{formatPrice(subTotal)}</span>
                </div>

                {
                    selected.length ?
                        <div className="w-full">
                            <Skeleton className="h-12 w-full bg-[#F0F0F0] rounded-sm" />
                            <Link href={route("checkout.show", { ids: selected.map(el => el.id) })} className="text-white w-full bg-black p-3 rounded-full flex items-center justify-center gap-2">
                                Go to Checkout
                                <ArrowRight className="w-5" />
                            </Link>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
