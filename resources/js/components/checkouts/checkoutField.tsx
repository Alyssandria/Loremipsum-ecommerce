import { cn } from "@/lib/utils"
import { Fieldset } from "@headlessui/react"
import { ComponentProps } from "react"

export const CheckoutField = ({ children, className, ...props }: ComponentProps<"fieldset">) => {
    return (
        <Fieldset className={cn("border space-y-4 border-[#6C7275] rounded-lg p-6", className)} {...props}>
            {children}
        </Fieldset>
    )
}
