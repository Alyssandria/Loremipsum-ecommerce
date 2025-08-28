import { type Product } from "@/types"
import { ComponentProps, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Rating } from "@/components/ui/rating"
import { Separator } from "@/components/ui/separator"
import { Cart } from "@/components/products/Cart"
import { Button } from "@/components/ui/button"

type ProductProps = {
    product: Product
} & ComponentProps<'div'>

const breadcrumbLinks = [
    {
        CONTENT: "Home",
        CURRENT: false,
        LINK: route('home')

    },
    {
        CONTENT: "Shop",
        CURRENT: false,
        LINK: route('product.index')

    },
    {
        CONTENT: "Product",
        CURRENT: true,
        LINK: ""

    }

]

export default function Product({ product }: ProductProps) {
    console.log(product);
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="flex flex-col gap-4 lg:gap-10">
            <Breadcrumb>
                <BreadcrumbList>
                    {breadcrumbLinks.map((el) => {
                        return (
                            el.CURRENT ?
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{el.CONTENT}</BreadcrumbPage>
                                </BreadcrumbItem>
                                :
                                <>
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href={el.LINK}>{el.CONTENT}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
            <section className="flex flex-col w-full gap-8 lg:flex-row">
                <div className="flex flex-col w-full">
                    <div className="relative w-full flex justify-center bg-[#F3F5F7]">
                        {
                            product.images.length === 1 ?
                                <img src={product.images[0]} className="w-full object-center md:max-w-[500px]" />
                                :
                                <Carousel>
                                    <CarouselContent className="items-center">
                                        {product.images.map((el) => {
                                            return (
                                                <CarouselItem className="flex justify-center">
                                                    <img src={el} className="w-full object-center md:max-w-[500px]" />
                                                </CarouselItem>
                                            )
                                        })}
                                    </CarouselContent>
                                    <CarouselPrevious className="left-5" />
                                    <CarouselNext className="right-5" />
                                </Carousel>
                        }
                    </div>
                    {product.images.length !== 1 &&
                        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:place-items-center">
                            {product.images.map((el) => {
                                return (
                                    <img src={el} className="w-1/2 max-w-full" />
                                )
                            })}
                        </div>
                    }
                </div>
                <div className="flex flex-col gap-6">
                    <div className="flex gap-4">
                        <Rating rating={product.rating} />
                        <span className="flex flex-nowrap">
                            {product.reviews.length}{' '}
                            Reviews
                        </span>
                    </div>
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold md:text-6xl">{product.title}</h1>
                        <p className="text-[#6C7275] md:text-lg">{product.description}</p>
                        <span className="font-medium text-2xl md:text-4xl">&#x20B1;{product.price}</span>
                    </div>
                    <div className="flex gap-4">
                        {product.tags.map((el) => {
                            return (
                                <div className="p-2 bg-[#F3F5F7]">
                                    {el}
                                </div>

                            )
                        })}
                    </div>
                    <Separator className="bg-muted-foreground" />
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex w-full gap-4 justify-between items-center bg-[#F3F5F7]">
                            <Button onClick={() => setQuantity(prev => prev + 1)} className="bg-transparent shadow-none text-lg font-bold">+</Button>
                            <span className="text-lg font-bold">{quantity}</span>
                            <Button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="bg-transparent shadow-none text-lg font-bold">-</Button>
                        </div>
                        <Cart productID={product.id} className="p-6 text-lg">
                            Add to Cart
                        </Cart>
                    </div>
                </div>
            </section>

            <Separator className="bg-muted-foreground" />

            <section className="flex flex-col gap-8">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <Separator className="bg-muted-foreground" />
                <h3 className="text-xl font-bold">{product.reviews.length} Reviews</h3>
                <div className="flex flex-col gap-8">
                    {
                        product.reviews.map(el => {
                            return (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="p-8 bg-black">
                                            <AvatarFallback className="text-white font-bold">{el.reviewerName.charAt(0).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-2">
                                            <span className="block text-xl font-bold">{el.reviewerName}</span>
                                            <Rating rating={el.rating} />
                                        </div>
                                    </div>
                                    <p className="text-[#6C7275] md:text-lg">{el.comment}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </div>
    )
}
