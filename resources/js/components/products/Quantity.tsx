import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import { ComponentProps, Dispatch } from "react"

type QuantityProps = {
    state: {
        quantity: number,
        setQuantity: Dispatch<React.SetStateAction<number>>
    }
} & ComponentProps<"div">

const QuantityButtons = ({ children, className, ...props }: ComponentProps<"button">) => {
    return (
        <Button className={cn("p-2 font-bold", className)} {...props}>{children}</Button>
    )

}

export const Quantity = ({ state, ...props }: QuantityProps) => {
    return (
        <div className="flex w-full gap-4 bg-[#F3F5F7] rounded-full px-2 justify-between items-center" {...props}>
            <QuantityButtons onClick={(e) => {
                e.stopPropagation();
                state.setQuantity(prev => prev + 1)
            }}>+</QuantityButtons>
            <span className="text-lg font-bold">{state.quantity}</span>
            <QuantityButtons onClick={(e) => {
                e.stopPropagation();
                state.setQuantity(prev => Math.max(1, prev - 1))
            }}>-</QuantityButtons>
        </div>
    )
}
