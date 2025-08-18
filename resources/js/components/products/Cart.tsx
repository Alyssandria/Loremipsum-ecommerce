import { Loader2Icon, ShoppingCartIcon } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { ComponentProps, useState } from "react"
import { router, usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

type CartComponentProps = {
    productID: number
} & ComponentProps<typeof Button>

export const Cart = ({ productID, className, ...props }: CartComponentProps) => {
    const { auth } = usePage<SharedData>().props;
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const addToCart = async function(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productID: number) {
        e.stopPropagation();

        if (!auth.user) {
            return router.visit(route('login'));
        }

        setIsLoading(true);

        const response = await fetch(`cart/${productID}`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!
            },
            method: 'post'
        });


        // HANDLE LOADING
        // SHOW ERROR TOAST
        if (!response.ok) {
            console.log()
            return;
        }

        setIsLoading(false);

        router.reload({ only: ['auth'] });
    }
    return (
        isLoading
            ?
            <Loader2Icon className="animate-spin" />
            :
            <Button className={cn("bg-secondary dark:bg-primary", className)} {...props} onClick={(e) => addToCart(e, productID)}>
                <ShoppingCartIcon className="size-6 stroke-secondary-foreground dark:stroke-primary-foreground" />
            </Button>
    )
}
