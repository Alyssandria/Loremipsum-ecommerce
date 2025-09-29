import { ComponentProps, useEffect, useState } from "react"
import { Button } from "./ui/button"
import { cn, fetchWithHeaders } from "@/lib/utils"
import { router } from "@inertiajs/react"

type QuantityHandlerProps = {
    quantity: number,
    productID: number,
    handle: -1 | 1
} & ComponentProps<"button">
export const QuantityHandler = ({ children, quantity, handle, productID, className, ...props }: QuantityHandlerProps) => {
    const [q, setQ] = useState<number>(quantity);

    useEffect(() => {
        const updateQuantity = async () => {
            const response = await fetchWithHeaders(route("cart.update", { productID, q }))

            if (!response.ok) {
                // handle error
                console.log(response);
            }

            router.reload({
                only: ["items"],
            })
        }


        const debounce = setTimeout(() => {
            updateQuantity();
        }, 500)

        return () => {
            clearTimeout(debounce);
        }

    }, [q]);
    return (
        <Button
            className={cn("p-0 bg-transparent text-black text-lg font-bold", className)}
            type="button"
            onClick={() => {
                setQ(prev => Math.max(1, prev + (handle)));
            }}
            {...props}
        >
            {children}
        </Button>
    )
}
