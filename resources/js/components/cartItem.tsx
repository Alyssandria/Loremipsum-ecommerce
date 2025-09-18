import { CartItemType, } from "@/types"
import { ComponentProps, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { router } from "@inertiajs/react"
import { Checkbox } from "./ui/checkbox"
import { cn, fetchWithHeaders, formatPrice } from "@/lib/utils"
import { Quantity, QuantityButton } from "./products/Quantity"
import { TrashIcon, XIcon } from "lucide-react"

type CartItemProps = {
    item: CartItemType,
    isSelected: boolean,
    setSelected: (item: CartItemType) => void,
    showCheckout: boolean
} & ComponentProps<'div'>

export function CartItem({ item, isSelected, showCheckout, setSelected }: CartItemProps) {

    const [quantity, setQuantity] = useState<number>(item.quantity);
    const [price, setPrice] = useState<number>(item.quantity * item.product.price);

    const handleQuantityMinus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setQuantity(prev => Math.max(1, prev - 1));
    }


    const handleQuantityAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        setQuantity(prev => prev + 1);
    }

    useEffect(() => {
        setPrice(quantity * item.product.price);

        const updateQuantity = async () => {

            const response = await fetchWithHeaders(route('cart.update', { productID: item.product.id, q: quantity }), "POST");

            if (!response.ok) {
                {
                    // HANDLE ERRORS
                    console.log(response);
                }
            }
        }

        updateQuantity();

    }, [quantity]);
    console.log(isSelected);

    return (
        <div role="button" className={cn("transition-all ease-in py-6 rounded-lg flex items-center gap-2", isSelected ? "bg-[#F3F5F7]" : "")} onClick={() => router.visit(route('product.show', item.product.id))} key={item.product.id}>
            <Checkbox
                onClick={(e) => {
                    e.stopPropagation()
                }}
                checked={isSelected}
                onCheckedChange={() => setSelected(item)}
            />

            <div className="flex flex-col w-full">
                <div className="flex gap-4 ">
                    <div
                        className="flex bg-[#F3F5F7] w-1/2 "
                    >
                        <img
                            className="object-contain"
                            src={item.product.thumbnail}
                        />
                    </div>

                    <div className="grid grid-cols-2 flex-col gap-2 truncate justify-between w-full">

                        <p className="font-bold md:text-lg w-full truncate col-span-full">{item.product.title}</p>

                        <p className="p-2 bg-[#F3F5F7] w-fit text-xs flex items-center">{item.product.category}</p>

                        <p className="font-bold row-start-3">{formatPrice(price)}</p>

                        <div className="w-full flex items-center justify-between">
                            <QuantityButton onClick={(e) => { handleQuantityMinus(e) }}>-</QuantityButton>
                            <span className="font-medium">{quantity}</span>
                            <QuantityButton onClick={(e) => { handleQuantityAdd(e) }}>+</QuantityButton>
                        </div>
                        <div className="w-full flex flex-col gap-2 row-start-4 col-span-full">
                            <Button
                                className={cn("md:text-lg", showCheckout ? "hidden" : "")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.visit(route('checkout.show', { ids: [item.product.id] }));
                                }}>
                                Checkout
                            </Button>
                            <Button
                                className={cn("", showCheckout ? "hidden" : "")}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    router.visit(route('checkout.show', { ids: item.product.id }));
                                }}>
                                <TrashIcon />
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
