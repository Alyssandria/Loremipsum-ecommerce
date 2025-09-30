import { Skeleton } from "@/components/ui/skeleton";
import { cn, fetchWithHeaders, formatPrice } from "@/lib/utils";
import { type CartItemType, SharedData } from "@/types";
import { ComponentProps, useEffect, useState } from "react"
import { CartItem } from "@/components/cartItem";
import { Separator } from "@/components/ui/separator";
import { Link, router, usePage } from "@inertiajs/react";
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
import { QuantityHandler } from "@/components/quantity-handler";

type CartsProps = {
    items: CartItemType[]
} & ComponentProps<"div">

export default function Carts({ items }: CartsProps) {
    const [carts, setCarts] = useState<CartItemType[]>(items);
    const [subTotal, setSubTotal] = useState<number>(0);
    const [selected, setSelected] = useState<CartItemType[]>([]);
    const [isLoading, setisLoading] = useState<boolean>(false);
    const [loadingProduct, setLoadingProduct] = useState<number | null>(null);
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
        setLoadingProduct(null);
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

            <div className="flex flex-col xl:flex-row justify-center md:p-12 gap-8">
                {

                    !carts.length ?
                        <span className="block text-center text-2xl font-bold">
                            Your cart is empty.
                            {" "}
                            <Link className="underline" href={route('product.index')}>Shop Now</Link>
                        </span>
                        :
                        <Table className="w-full">
                            <TableCaption className="sr-only">Your cart items</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-fit">
                                        <Checkbox
                                            checked={carts.length === selected.length}
                                            onClick={() => selected.length !== carts.length ? setSelected([...carts]) : setSelected([])}
                                        />
                                    </TableHead>
                                    <TableHead>Product</TableHead>
                                    <TableHead className="max-md:hidden">Quantity</TableHead>
                                    <TableHead className="max-md:hidden">Price</TableHead>
                                    <TableHead className="text-right max-md:hidden">Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {

                                    carts.map(el => {
                                        return (
                                            <TableRow>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selected.some(x => el.product.id === x.product.id)}
                                                        onClick={() => toggleSelect(el)}
                                                    />
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
                                                            <CartItem.RemoveButton
                                                                handleRemove={async (opts) => {
                                                                    opts.setIsLoading(true);
                                                                    const response = await fetchWithHeaders(route("cart.delete", { productID: el.product.id }), "DELETE");

                                                                    if (!response.ok) {
                                                                        // HANDLE ERRORS
                                                                        console.log(response);
                                                                    }
                                                                    const json = await response.json();
                                                                    setCarts(json['items']);
                                                                    router.reload({ only: ["items", "auth"] })
                                                                    opts.setIsLoading(false);
                                                                }}
                                                                className={
                                                                    cn(
                                                                        "md:row-start-3 md:place-self-start",
                                                                        selected.length ? "hidden" : ""
                                                                    )}
                                                            />
                                                            <CartItem.Checkout
                                                                href={route("checkout.show", { ids: [el.product.id] })}
                                                                className={
                                                                    cn(
                                                                        "max-sm:text-xs md:row-start-3 md:col-start-2 md:w-fit md:place-self-start",
                                                                        selected.length ? "hidden" : ""
                                                                    )}
                                                            >
                                                                Checkout
                                                            </CartItem.Checkout>
                                                            <CartItem.Image src={el.product.thumbnail} />

                                                            <QuantityHandler
                                                                className="md:hidden col-start-2 row-start-3 flex items-center justify-between px-2 py-1 border border-[#6C7275] rounded-lg"
                                                                quantity={el.quantity}
                                                                productID={el.product.id}
                                                                onQuantityChange={() => {
                                                                    setLoadingProduct(el.product.id);
                                                                    setisLoading(true)
                                                                }}
                                                            />
                                                        </CartItem.Content>
                                                    </CartItem>
                                                </TableCell>
                                                <TableCell className="max-md:hidden text-center">
                                                    <QuantityHandler
                                                        quantity={el.quantity}
                                                        productID={el.product.id}
                                                        onQuantityChange={() => {
                                                            setLoadingProduct(el.product.id);
                                                            setisLoading(true)
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell className="max-md:hidden text-right">
                                                    <span className="font-bold">

                                                        {formatPrice(el.product.price)}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="max-md:hidden text-right">
                                                    <span className="font-bold">
                                                        {loadingProduct === el.product.id ?
                                                            <Skeleton className="h-5 w-20" />
                                                            :
                                                            formatPrice(el.product.price * el.quantity)}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                            </TableBody>
                        </Table>
                }
                <div className="border p-4 rounded-2xl flex flex-col gap-6 xl:w-1/2 h-fit">
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
