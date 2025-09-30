import { cn } from "@/lib/utils"
import { Check, CheckCircle } from "lucide-react"
import { ComponentProps } from "react"

const STEPS = [
    {
        step: 1,
        content: "Shopping Cart",
    },
    {
        step: 2,
        content: "Checkout Details",
    },
    {
        step: 3,
        content: "Order Complete",
    },
]

type cartStepProps = {
    current?: number
} & ComponentProps<"div">
export const CartSteps = ({ current = 1, className, ...props }: cartStepProps) => {
    return (
        <div className="flex w-full md:justify-center">
            <div className="w-full lg:w-3/5 flex md:gap-12 max-md:justify-between">
                {
                    STEPS.map((el) => {
                        const isCurrent = current === el.step;
                        return (
                            <div
                                className={cn(
                                    "flex gap-4 items-center py-4 w-full",
                                    isCurrent ? "border-b-2" : "",
                                    el.step < current ? "max-md:hidden border-b-2 border-[#38CB89]" : "",
                                    el.step > (current + 1) ? "max-md:hidden" : "",
                                    el.step === (current + 1) ? "max-md:w-fit" : "",
                                    className
                                )}
                                {...props}
                            >
                                <div className={cn(
                                    "p-6 text-lg font-bold rounded-full bg-[#B1B5C3] text-white flex items-center justify-center w-fit size-8",
                                    el.step < current ? "bg-[#38CB89]" : "",
                                    isCurrent ? "bg-[#23262F]" : ""
                                )}>
                                    {
                                        el.step < current ?
                                            <span>
                                                <Check />
                                            </span>
                                            :
                                            el.step
                                    }
                                </div>
                                <span
                                    className={cn(
                                        "block font-medium text-lg text-[#B1B5C3]",
                                        el.step < current ? "text-[#38CB89]" : "",
                                        el.step === current ? "text-[#23262F]" : "",
                                        el.step === (current + 1) ? "max-md:hidden" : "",
                                    )}
                                >
                                    {el.content}
                                </span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}
