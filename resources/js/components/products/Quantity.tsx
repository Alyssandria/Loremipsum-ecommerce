import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import { ComponentProps } from "react"

export const QuantityButton = ({ children, className, ...props }: ComponentProps<"button">) => {
    return (
        <Button className={cn("p-2 font-bold md:text-lg", className)} {...props}>{children}</Button>
    )
}

export const Quantity = ({ children, ...props }: ComponentProps<"div">) => {
    return (
        <div className="flex w-full gap-4 px-2 border rounded-sm justify-between items-center" {...props}>
            {children}
        </div>
    )
}
