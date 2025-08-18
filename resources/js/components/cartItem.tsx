import { Product, SharedData } from "@/types"
import { ComponentProps } from "react"
import { Button } from "./ui/button"
import { router, usePage } from "@inertiajs/react"

type CartItemProps = {
    item: Product,
} & ComponentProps<'div'>

export function CartItem({ item }: CartItemProps) {
    const { auth } = usePage<SharedData>().props
    return (
        <div role="button" className="flex gap-2" onClick={() => router.visit(route('product.show', item.id))} key={item.id}>
            <img
                src={item.thumbnail}
                className="w-1/2 h-full"
            />
            <div className="flex flex-col gap-2">
                <p className="font-bold">{item.title}</p>
                <p>{item.category}</p>
                <p>{(auth.carts!.find((elem) => elem.product_id === item.id)!.quantity)}</p>
                <p>{item.price * auth.carts!.find((elem) => elem.product_id === item.id)?.quantity!}</p>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    router.visit(route('checkout.show', item.id));
                }}>
                    Checkout
                </Button>
            </div>
        </div>
    )
}
