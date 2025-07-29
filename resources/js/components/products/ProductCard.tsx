
import { Product } from "@/types";
import { ComponentProps } from "react";
import { Card, CardHeader, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Link } from "@inertiajs/react";
import { ShoppingCartIcon } from "lucide-react";

type ProductCardComponent = {
    data: Product
} & ComponentProps<'div'>

export const ProductCard = ({ data }: ProductCardComponent) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{data.title}</CardTitle>
                <div>
                    <Link href={route('cart.add', data.id)} method="post" as="button">
                        <ShoppingCartIcon />
                    </Link>
                </div>
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
