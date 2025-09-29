import { ComponentProps } from "react"
import { Button } from "./ui/button"
import { cn, } from "@/lib/utils"
import { useUpdateQuantity } from "@/hooks/use-update-quantity"

type QuantityHandlerProps = {
    quantity: number,
    onQuantityChange?: () => void;
    productID: number,
} & ComponentProps<"div">
export const QuantityHandler = ({ children, onQuantityChange, quantity, productID, className, ...props }: QuantityHandlerProps) => {
    const quantityHook = useUpdateQuantity(quantity, productID, { onQuantityChange });
    return (
        <div className={cn("flex items-center gap-2 justify-between", className)} {...props}>
            <Button
                className={"p-0 md:p-4 bg-transparent text-black text-lg font-bold"}
                type="button"
                onClick={() => {
                    quantityHook.setQuantity(prev => Math.max(1, prev - 1));
                }}
            >
                -
            </Button>
            <span className="block max-md:text-xs font-bold">{quantityHook.quantity}</span>
            <Button
                className={"p-0 md:p-4 bg-transparent text-black text-lg font-bold"}
                type="button"
                onClick={() => {
                    quantityHook.setQuantity(prev => prev + 1);
                }}
            >
                +
            </Button>
        </div>
    )
}
