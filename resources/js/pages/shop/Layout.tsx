import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";
import { ComponentProps } from "react";

type ShopLayoutProps = {
    response: Product[]
} & ComponentProps<"div">

export default function Layout({ response }: ShopLayoutProps) {
    return (
        <div className="grid grid-cols-3 w-full gap-4">
            {
                response.map((el) => (
                    <ProductCard data={el} key={el.id} />
                ))
            }

        </div>
    )
}
