import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Product } from "@/types";
import { ComponentProps } from "react";

type ProductCardComponent = {
    data: Product
} & ComponentProps<'div'>

const ProductCard = ({ data }: ProductCardComponent) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <img src={data.thumbnail} alt="product image" />
            </CardContent>
            <CardFooter>
                <p>{data.price}</p>
            </CardFooter>
        </Card>
    )
}
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
