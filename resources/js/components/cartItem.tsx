import { cn, fetchWithHeaders } from "@/lib/utils";
import { CartItemType } from "@/types"
import { ComponentProps, createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Button } from "./ui/button";
import { router } from "@inertiajs/react";


const CartItemContext = createContext<null | {
    item: CartItemType
    quantity: number
    setQuantity: Dispatch<SetStateAction<number>>
}>(null);

const useCartItemContext = () => {
    const ctx = useContext(CartItemContext);
    if (!ctx) throw new Error("CartItem Context is null");
    return ctx;
}


const Title = ({ children, className, ...props }: ComponentProps<"div">) => {
    const title = useCartItemContext();
    return (
        <p className={cn("", className)} {...props}>
            {title.item.product.title}
        </p>
    )
}

const Content = function({ children, className, ...props }: ComponentProps<"div">) {
    return (
        <div>
            {children}
        </div>
    )
}


const QuantityText = ({ className }: ComponentProps<"span">) => {
    const { quantity } = useCartItemContext();
    return (
        <span>
            {quantity}
        </span>
    )

}

type QuantityHandlerProps = {
    handleQuantityClick?: (ctx: {
        item: CartItemType
        quantity: number
        setQuantity: Dispatch<SetStateAction<number>>
    }) => void
} & ComponentProps<"button">
const QuantityHandler = ({ children, handleQuantityClick, className, ...props }: QuantityHandlerProps) => {
    const ctx = useCartItemContext();
    return (
        <Button
            className={cn("", className)}
            onClick={() => {
                handleQuantityClick?.(ctx);
            }}
            {...props}
        >
            {children}
        </Button>
    )
}


type CartItemProps = {
    item: CartItemType,
    onQuantityChange?: () => void
} & ComponentProps<"div">

export const CartItem = ({ item, onQuantityChange, children, className, ...props }: CartItemProps) => {
    const [quantity, setQuantity] = useState<number>(item.quantity);

    useEffect(() => {
        onQuantityChange?.();

        const fetchData = async () => {
            const response = await fetchWithHeaders(route("cart.update", { productID: item.product.id, q: quantity }), "POST")

            if (!response.ok) {
                console.log(response);
            }

            router.reload({
                only: ["items"]
            })
        }

        const debounce = setTimeout(() => {
            fetchData();
        }, 500);


        return () => {
            clearTimeout(debounce);
        }

    }, [quantity]);
    return (
        <CartItemContext.Provider value={{ item, quantity, setQuantity }}>
            <div className={cn("", className)} {...props}>
                {children}
            </div>
        </CartItemContext.Provider>
    )
}



CartItem.Title = Title;
CartItem.Content = Content;
CartItem.QuantityHandler = QuantityHandler;
CartItem.QuantityText = QuantityText;
