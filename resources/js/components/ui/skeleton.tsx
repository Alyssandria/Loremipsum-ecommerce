import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="skeleton"
            className={cn("bg-[#F3F5F7] animate-pulse rounded-md", className)}
            {...props}
        />
    )
}

export { Skeleton }
