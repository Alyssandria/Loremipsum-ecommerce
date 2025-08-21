
import { Product } from "@/types";
import { ComponentProps } from "react";
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { ShoppingCartIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import { Cart } from "./Cart";

type ProductCardComponent = {
    data: Product
} & ComponentProps<'div'>

export const ProductCard = ({ data, className }: ProductCardComponent) => {
    console.log(data);
    return (
        <form onClick={() => route('product.show', data.id)} className={cn("w-full block text-left hover:cursor-pointer", className)}>
            <Card className="bg-white border-none shadow-none">
                <CardContent className="group relative flex flex-col justify-center bg-[#F3F5F7] p-0">
                    <div className="transition-all ease-in flex items-center justify-center group-hover:scale-105">
                        <img src={data.thumbnail} alt="product image" />
                    </div>
                    <div className="transition-all opacity-0 ease-in p-2 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 md:p-6">
                        <Cart productID={data.id} className="text-xs w-full py-0 text-white bg-black md:p-6 md:text-lg hover:bg-secondary">
                            Add to cart
                        </Cart>
                    </div>
                </CardContent>
                <CardFooter className="p-0 text-primary-foreground flex flex-col gap-2 items-start">
                    <div className="flex gap-2">
                        {Array.from({ length: 5 }).fill(0).map((_, i) => {
                            const rating = Math.floor(data.rating);
                            return (
                                <StarIcon className={cn("w-3 fill-[#343839] border-none", i <= rating ? "fill-yellow-400" : "")} key={i} />
                            )
                        })}
                    </div>
                    <p className="font-bold md:text-lg">{data.title}</p>
                    <p className="font-bold">&#8369;{data.price}</p>

                    <div className="p-2 w-full flex justify-end lg:hidden">
                        <Cart productID={data.id} className="text-white bg-black">
                            <ShoppingCartIcon className="size-4" />
                        </Cart>
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}
