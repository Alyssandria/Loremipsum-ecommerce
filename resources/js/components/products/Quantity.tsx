import { Button } from "@headlessui/react";
import { ComponentProps, Dispatch } from "react"

type QuantityProps = {
    state: {
        quantity: number,
        setQuantity: Dispatch<React.SetStateAction<number>>
    }
} & ComponentProps<"div">

export const Quantity = ({ state, ...props }: QuantityProps) => {
    return (
        <div className="flex w-full gap-4" {...props}>
            <Button onClick={() => state.setQuantity(state.quantity++)}>+</Button>
            <span className="text-lg">{state.quantity}</span>
            <Button onClick={() => state.setQuantity(prev => prev--)}>-</Button>
        </div>
    )
}
