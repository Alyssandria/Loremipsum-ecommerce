import { ComponentProps } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

export const CheckoutLabel = ({ className, children, ...props }: ComponentProps<typeof Label>) => {
    return (
        <Label className={cn("block text-muted-foreground font-bold", className)} {...props}>{children}</Label>
    )

}
