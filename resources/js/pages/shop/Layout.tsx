import { ProductCard } from "@/components/products/ProductCard";

export default function Layout({ response }) {
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
