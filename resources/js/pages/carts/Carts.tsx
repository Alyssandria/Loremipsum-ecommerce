import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatPrice } from "@/lib/utils";
import { type CartItemType, SharedData } from "@/types";
import { ComponentProps, useEffect, useState } from "react"
import { CartItem } from "@/components/cartItem";
import { Separator } from "@/components/ui/separator";
import { Link, usePage } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CartSteps } from "@/components/checkouts/cartSteps";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@headlessui/react";

type CartsProps = {
    items: CartItemType[]
} & ComponentProps<"div">

export default function Carts({ items }: CartsProps) {
    const [carts, setCarts] = useState<CartItemType[]>(items);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [selected, setSelected] = useState<CartItemType[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const { auth } = usePage<SharedData>().props;

    const toggleSelect = (item: CartItemType) => {
        if (!auth.carts) {
            return;
        }
        setSelected(prev => {
            return prev.some(el => el.product.id === item.product.id) ? prev.filter(el => el.product.id !== item.product.id) : [...prev, item]
        });

    }

    useEffect(() => {
        setCarts(items);
    }, [items]);

    useEffect(() => {
        if (!auth.carts) return;

        let total = 0;
        selected.forEach(el => {
            const item = items.find(x => x.product.id === el.product.id);

            if (item) {
                total += item.quantity * item.product.price
            }
        });

        setSubTotal(total);
        setisLoading(false);

    }, [selected, items]);

    return (
        <div className="flex flex-col gap-8">
            <div className="">
                <h1 className="text-center text-3xl font-bold">Cart</h1>
                <CartSteps />
            </div>

            <div className="flex flex-col lg:flex-row justify-center p-12 gap-8">
                <Table className="w-full">
                    <TableCaption>A list of your recent invoices.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-fit">
                                <Checkbox />
                            </TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead className="max-md:hidden">Quantity</TableHead>
                            <TableHead className="max-md:hidden">Price</TableHead>
                            <TableHead className="text-right max-md:hidden">Subtotal</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {

                            !carts.length ?
                                <span>
                                    Your cart is empty
                                </span>
                                :
                                carts.map(el => {
                                    return (
                                        <TableRow>
                                            <TableCell>
                                                <Checkbox />
                                            </TableCell>

                                            <TableCell>
                                                <CartItem item={el} onQuantityChange={
                                                    () => {
                                                        if (selected.some((x) => x.product.id === el.product.id)) {
                                                            console.log("qweqwe");
                                                            setisLoading(true);
                                                        }
                                                    }
                                                }>
                                                    <CartItem.Content>
                                                        <CartItem.Title />
                                                        <CartItem.Category />
                                                        <CartItem.Price className="md:hidden" />
                                                        <CartItem.RemoveButton className="md:row-start-3 place-self-start" />
                                                        <CartItem.Checkout className="max-sm:text-xs md:row-start-3 md:col-start-2 md:w-fit md:place-self-start">Checkout</CartItem.Checkout>
                                                        <CartItem.Image src={el.product.thumbnail} />
                                                        <div className="md:hidden col-start-2 row-start-3 flex items-center justify-between px-2 py-1 border border-[#6C7275] rounded-lg">
                                                            <CartItem.QuantityHandler handleQuantityClick={(ctx) => {
                                                                ctx.setQuantity(prev => Math.max(1, prev - 1))
                                                            }}
                                                            >
                                                                -
                                                            </CartItem.QuantityHandler>
                                                            <CartItem.QuantityText />
                                                            <CartItem.QuantityHandler handleQuantityClick={(ctx) => { ctx.setQuantity(prev => prev + 1) }}>
                                                                +
                                                            </CartItem.QuantityHandler>
                                                        </div>
                                                    </CartItem.Content>
                                                </CartItem>
                                            </TableCell>
                                            <TableCell className="max-md:hidden text-center">
                                                <div className="flex gap-4 w-full justify-center">
                                                    <Button>
                                                        -
                                                    </Button>
                                                    <span className="font-bold">
                                                        {el.quantity}
                                                    </span>
                                                    <Button>
                                                        +
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell className="max-md:hidden text-right">
                                                <span className="font-bold">
                                                    {formatPrice(el.product.price)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="max-md:hidden text-right">
                                                <span className="font-bold">
                                                    {formatPrice(el.product.price)}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                        }
                    </TableBody>
                </Table>
                <div className="border p-4 rounded-2xl flex flex-col gap-6 lg:w-1/2 h-fit">
                    <span className="block font-bold text-xl">Cart Summary</span>
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="block text-secondary/60 font-medium">Subtotal</span>
                            <span className="block font-bold">
                                {isLoading ?
                                    <Skeleton className="h-5 w-20" />
                                    :
                                    formatPrice(subTotal)
                                }
                            </span>
                        </div>
                        <Separator />
                    </div>
                    <div className="flex justify-between">
                        <span className="block text-lg">Total</span>
                        <span className="block font-bold">{isLoading ? <Skeleton className="h-5 w-20" /> : formatPrice(subTotal)}</span>
                    </div>

                    {
                        selected.length ?
                            <div className="w-full">
                                <Link href={route("checkout.show", { ids: selected.map(el => el.product.id) })} className="text-white w-full bg-black p-3 rounded-full flex items-center justify-center gap-2">
                                    Go to Checkout
                                    <ArrowRight className="w-5" />
                                </Link>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}
