import { cn, fetchWithHeaders, formatPrice } from "@/lib/utils";
import { CartItemType } from "@/types"
import { ComponentProps, createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import { Button } from "./ui/button";
import { router } from "@inertiajs/react";
import { XIcon } from "lucide-react";


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
    const { item } = useCartItemContext();
    return (
        <p className={cn("truncate font-bold", className)} {...props}>
            {item.product.title}
        </p>
    )
}


const Price = ({ children, className, ...props }: ComponentProps<"div">) => {
    const { item } = useCartItemContext();
    return (
        <p className={cn("truncate font-bold text-end", className)} {...props}>
            {formatPrice(item.product.price)}
        </p>
    )
}

const Content = function({ children, className, ...props }: ComponentProps<"div">) {
    return (
        <div className="grid grid-cols-3 gap-4">
            {children}
        </div>
    )
}

const Image = function({ className, ...props }: ComponentProps<"img">) {
    return (
        <div className="flex justify-center items-center bg-[#F3F5F7] col-start-1 row-start-1 row-span-3">
            <img
                className={cn("object-contain max-h-32", className)}
                {...props}
            />
        </div>
    )
}

const Category = ({ className, ...props }: ComponentProps<"p">) => {
    const { item } = useCartItemContext();
    return (
        <p
            className={cn("text-[#6C7275] flex items-center font-medium row-start-2 col-start-2", className)}
            {...props}
        >{item.product.category}</p>
    )
}

const QuantityText = ({ className }: ComponentProps<"span">) => {
    const { quantity } = useCartItemContext();
    return (
        <span className={cn("font-medium", className)}>
            {quantity}
        </span>
    )
}

const RemoveButton = ({ className, ...props }: ComponentProps<"button">) => {
    return (
        <Button
            className={cn("w-fit place-self-end bg-transparent text-black shadow-none", className)}
            {...props}
        >
            <XIcon />
        </Button>
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
            className={cn("p-0 bg-transparent text-black text-lg font-bold", className)}
            onClick={() => {
                handleQuantityClick?.(ctx);
            }}
            {...props}
        >
            {children}
        </Button>
    )
}

const Checkout = ({ children, className, ...props }: ComponentProps<"button">) => {

    return (
        <Button
            {...props}
            className={cn("p-2 col-start-3 size-full place-self-center", className)}
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
            <div className={cn("w-full", className)} {...props}>
                {children}
            </div>
        </CartItemContext.Provider>
    )
}

CartItem.Title = Title;
CartItem.Content = Content;
CartItem.QuantityHandler = QuantityHandler;
CartItem.QuantityText = QuantityText;
CartItem.Image = Image;
CartItem.Category = Category;
CartItem.Price = Price;
CartItem.RemoveButton = RemoveButton;
CartItem.Checkout = Checkout;
