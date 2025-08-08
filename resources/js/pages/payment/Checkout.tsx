import { Product } from "@/types";
import { ComponentProps } from "react";

type CheckoutProps = {
    products: Product
} & ComponentProps<'div'>

export default function Checkout({ products }: CheckoutProps) {
    console.log(products);
    return (
        <div>
        </div>
    )

}
