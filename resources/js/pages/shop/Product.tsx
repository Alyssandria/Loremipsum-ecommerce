import { type Product } from "@/types"
import { ComponentProps } from "react"

type ProductProps = {
    product: Product
} & ComponentProps<'div'>

export default function Product({ product }: ProductProps) {
    return (
        <div>
            <p className="text-white">Hello World</p>
        </div>
    )
}
