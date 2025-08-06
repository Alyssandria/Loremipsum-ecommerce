
import { Product } from "@/types";
import { ComponentProps } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Cart } from "./Cart";

type ProductCardComponent = {
    data: Product
} & ComponentProps<'div'>

export const ProductCard = ({ data }: ProductCardComponent) => {
    return (
        <form onClick={() => route('product.show', data.id)} className="block text-left">
            <Card>
                <CardHeader>
                    <CardTitle>{data.title}</CardTitle>
                    <div>
                        <Cart productID={data.id} type="button" />
                    </div>
                </CardHeader>
                <CardContent>
                    <img src={data.thumbnail} alt="product image" />
                </CardContent>
                <CardFooter>
                    <p>{data.price}</p>
                </CardFooter>
            </Card>
        </form>
    )
}
