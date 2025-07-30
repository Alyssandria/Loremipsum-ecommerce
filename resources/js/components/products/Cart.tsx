import { ShoppingCartIcon } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"
import { router, usePage } from "@inertiajs/react"
import { SharedData } from "@/types"

type CartComponentProps = {
    productID: number
} & ComponentProps<typeof Button>
export const Cart = ({ productID, className, ...props }: CartComponentProps) => {
    const { auth } = usePage<SharedData>().props;
    console.log()

    const addToCart = async function(productID: number) {
        if (!auth.user) {
            return router.visit(route('login'));
        }

        const response = await fetch(`cart/${productID}`, {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]')!.getAttribute('content')!
            },
            method: 'post'
        });

        console.log(response);

    }
    return (
        <Button className={cn("", className)} {...props} onClick={() => addToCart(productID)}>
            <ShoppingCartIcon className="size-6" />
        </Button>
    )
}
