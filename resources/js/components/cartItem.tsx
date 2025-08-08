import { Product, SharedData } from "@/types"
import { ComponentProps } from "react"
import { Skeleton } from "./ui/skeleton"
import { Button } from "./ui/button"
import { router, usePage } from "@inertiajs/react"

type CartItemProps = {
    item: Product,
    isLoading: boolean
} & ComponentProps<'div'>

export function CartItem({ item, isLoading }: CartItemProps) {
    const { auth } = usePage<SharedData>().props
    return (
        isLoading
            ?
            <div className="w-full h-20 flex gap-2" key={item.id}>
                <Skeleton className="w-1/2 h-full" />
                <div className="flex gap-3 flex-col w-full">
                    <Skeleton className="h-full w-full" />
                    <Skeleton className="h-full w-1/2" />
                    <Skeleton className="w-8 h-full" />
                </div>
            </div>
            :
            <div role="button" className="flex gap-2" onClick={() => router.visit(route('product.show', item.id))} key={item.id}>
                <img
                    src={item.thumbnail}
                    className="w-1/2 h-full"
                />
                <div className="flex flex-col gap-2">
                    <p className="font-bold">{item.title}</p>
                    <p>{item.category}</p>
                    <p>{(auth.carts!.find((elem) => elem.product_id === item.id)!.quantity).toFixed(2)}</p>
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
