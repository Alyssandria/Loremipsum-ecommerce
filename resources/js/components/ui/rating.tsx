import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import { ComponentProps } from "react";

export const Rating = ({ rating, ...props }: { rating: number } & ComponentProps<typeof StarIcon>) => {
    return (
        <div className="flex gap-2">
            {
                Array.from({ length: 5 }).fill(0).map((_, i) => {
                    return (
                        <StarIcon
                            className={cn("w-3 fill-[#343839] border-none", i <= Math.floor(rating) ? "fill-yellow-400" : "")}
                            key={i}
                            {...props}
                        />
                    )
                })
            }
        </div>
    )
}
