import { Loader2Icon, ShoppingCartIcon } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { ComponentProps, useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

type CartComponentProps = {
    productID: number
} & ComponentProps<typeof Button>

export const Cart = ({ productID, className, children, ...props }: CartComponentProps) => {
    const { auth } = usePage<SharedData>().props;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addToCart = async function(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productID: number) {
        e.stopPropagation();

        setIsLoading(true);

        if (!auth.user) {
            return router.visit(route('login'));
        }

        const response = await fetch(route('cart.add', productID), {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!
            },
            method: 'post'
        });


        // SHOW ERROR TOAST
        if (!response.ok) {
            console.log(response);
            return;
        }

        router.reload({ only: ['auth'] });

        setIsLoading(false);
    }
    return (
        <Button className={cn("flex items-center justify-center bg-black text-white w-full lg:min-w-[180px]", isLoading ? "hover:cursor-not-allowed" : "", className)} disabled={isLoading} {...props} onClick={(e) => addToCart(e, productID)}>
            <span className="block text-center">
                {
                    isLoading
                        ?
                        <Loader2Icon className="w-full animate-spin" />
                        :
                        children
                }
            </span>
        </Button>
    )
}
