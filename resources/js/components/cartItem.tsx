import { Product, SharedData } from "@/types"
import { ComponentProps, useState } from "react"
import { Button } from "./ui/button"
import { router, usePage } from "@inertiajs/react"
import { Checkbox } from "./ui/checkbox"
import { cn, formatPrice } from "@/lib/utils"
import { Quantity } from "./products/Quantity"

type CartItemProps = {
    item: Product,
    isSelected: boolean,
    setSelected: (item: Product) => void,
    showCheckout: boolean
} & ComponentProps<'div'>

export function CartItem({ item, isSelected, showCheckout, setSelected }: CartItemProps) {
    const { auth } = usePage<SharedData>().props
    const [quantity, setQuantity] = useState<number>((auth.carts!.find((elem) => elem.product_id === item.id)!.quantity));

    console.log(isSelected);
    return (
        <div role="button" className={cn("transition-all ease-in py-6 rounded-lg flex justify-between items-center gap-2", isSelected ? "bg-[#F3F5F7]" : "")} onClick={() => router.visit(route('product.show', item.id))} key={item.id}>
            <Checkbox
                onClick={(e) => {
                    e.stopPropagation()
                }}
                checked={isSelected}
                onCheckedChange={() => setSelected(item)}
            />
            <img
                className="w-2/5 md:w-1/2 h-full"
                src={item.thumbnail}
            />
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <p className="font-bold text-lg">{item.title}</p>
                    <p className="p-2 bg-[#F3F5F7] w-fit text-xs">{item.category}</p>
                    <p className="font-bold">{formatPrice(item.price * auth.carts!.find((elem) => elem.product_id === item.id)?.quantity!)}</p>
                </div>
                <Quantity state={{ quantity, setQuantity }} />
                <Button
                    className={cn("", showCheckout ? "hidden" : "")}
                    onClick={(e) => {
                        e.stopPropagation();
                        router.visit(route('checkout.show', item.id));
                    }}>
                    Checkout
                </Button>
            </div>
        </div>
    )
}
