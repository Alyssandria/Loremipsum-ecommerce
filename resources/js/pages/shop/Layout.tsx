import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/types";
import { ComponentProps, useEffect, useState } from "react";
import shopHero from "@/assets/shop-hero.jpg";
import { ShopPage } from "@/lib/lang";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ChevronDown, Columns2, Grid3x3, Rows2, Settings2 } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMediaQuery } from 'usehooks-ts'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
type ShopLayoutProps = {
    products: Product[],
    currentCategory: string,
    categoryList: string[],
    sort: "asc" | "desc",
    order: "title" | "price" | "rating"
} & ComponentProps<"div">

const SORTOPTIONS = {
    SORT: [
        {
            CONTENT: "Title",
            VALUE: "title"
        },
        {
            CONTENT: "Price",
            VALUE: "price"
        },
        {
            CONTENT: "Rating",
            VALUE: "rating"
        }
    ],
    ORDER: [
        {
            CONTENT: "Ascending",
            VALUE: "asc"
        },
        {
            CONTENT: "Descending",
            VALUE: "desc"
        },
    ]

}

const SortOption = ({ children, ...props }: ComponentProps<typeof Link>) => {
    return (
        <Link {...props}>
            {children}
        </Link>
    )
}

const LayoutButton = ({ children, className, ...props }: ComponentProps<typeof Button>) => {
    return (
        <Button
            className={cn("rounded-none bg-transparent shadow-none border border-[#E8ECEF] has-[>svg]:stroke-white has-[>svg]:fill-[#141718]", className)}
            {...props}
        >
            {children}
        </Button>
    )
}

export default function Layout({ sort, order, products, currentCategory, categoryList }: ShopLayoutProps) {
    const isPhone = useMediaQuery('(max-width: 768px)');
    const [columns, setColumns] = useState<number>(2);

    console.log(products)

    useEffect(() => {
        if (isPhone) {
            setColumns(2);
        }
    }, [isPhone]);

    return (
        <>
            <div className="flex flex-col gap-8">

                <section className="relative">
                    <div className="size-full absolute gap-4 top-0 text-black z-10 p-4 flex justify-center items-center flex-col">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={route("home")} className="font-medium text-[#605F5F] md:text-lg">Home</BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="text-[#605F5F]" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage className="font-medium text-[#121212] md:text-lg">Shop</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                        <h1 className="font-bold text-3xl md:text-8xl">{ShopPage.Hero.title}</h1>
                        <p className="text-lg text-center ">{ShopPage.Hero.subtitle}</p>
                    </div>
                    <img src={shopHero} className="max-h-[500px] size-full object-cover opacity-50" />
                </section>

                <section>
                    <div className="flex flex-col gap-4">
                        <div>

                            <div className="hidden lg:flex">
                                <Settings2 />
                                <p>Filter</p>
                            </div>
                            <div className="hidden lg:flex lg:flex-col">
                                <p className="font-bold uppercase">Categories</p>
                                {categoryList.map(el => {
                                    return (
                                        <Link href={route('product.index', { category: el })} key={el}>{el}</Link>
                                    )
                                })}
                            </div >

                            <div className="flex py-2 justify-between items-center border-t border-b border-t-[#E8ECEF] border-b-[#E8ECEF]">

                                <Drawer>
                                    <DrawerTrigger className="flex gap-2 lg:hidden">
                                        <Settings2 />
                                        <p className="font-bold">Filter</p>
                                    </DrawerTrigger>
                                    <DrawerContent className="p-8">
                                        <DrawerHeader>
                                            <DrawerTitle>Filter Products</DrawerTitle>
                                        </DrawerHeader>

                                        <div className="space-y-4">
                                            <p className="font-bold">Categories</p>
                                            <div className="max-h-[300px] overflow-auto flex flex-col gap-4 ">
                                                {categoryList.map(el => {
                                                    return (
                                                        <Link href={route('product.index', { category: el })} key={el}>{el}</Link>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <DrawerFooter>
                                            <Button>Submit</Button>
                                            <DrawerClose asChild>
                                                <Button variant="outline">Cancel</Button>
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </DrawerContent>
                                </Drawer>

                                <div className="p-2">
                                    <LayoutButton
                                        onClick={() => setColumns(2)}
                                        className={columns === 2 ? "bg-[#F3F5F7]" : ""}
                                    >
                                        <Columns2 className="border-none stroke-white fill-[#141718]" />
                                    </LayoutButton>
                                    <LayoutButton
                                        onClick={() => setColumns(1)}
                                        className={columns === 1 ? "bg-[#F3F5F7]" : ""}
                                    >
                                        <Rows2 className="border-none stroke-white fill-[#141718]" />
                                    </LayoutButton>
                                    <LayoutButton
                                        onClick={() => setColumns(3)}
                                        className={cn("max-md:hidden", columns === 3 ? "bg-[#F3F5F7]" : "")}
                                    >
                                        <Grid3x3 className="border-none stroke-white fill-[#141718]" />
                                    </LayoutButton>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex justify-between">
                                <p className="font-bold text-xl w-1/2">{currentCategory}</p>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <span className="flex items-center font-bold">
                                            Sort by
                                            <ChevronDown />
                                        </span>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>

                                        {SORTOPTIONS.SORT.map((el) => {
                                            return (
                                                <SortOption
                                                    href={route("product.index", currentCategory !== "all" ? { category: currentCategory, sort, order: el.VALUE } : { sort, order: el.VALUE })}
                                                >
                                                    <DropdownMenuItem>{el.CONTENT}</DropdownMenuItem>
                                                </SortOption>

                                            )

                                        })}

                                        <DropdownMenuLabel>
                                            Order By
                                        </DropdownMenuLabel>

                                        {SORTOPTIONS.ORDER.map((el) => {
                                            return (
                                                <SortOption
                                                    href={route("product.index", currentCategory !== "all" ? { category: currentCategory, sort: el.VALUE, order } : { sort: el.VALUE, order })}
                                                >
                                                    <DropdownMenuItem>{el.CONTENT}</DropdownMenuItem>
                                                </SortOption>

                                            )

                                        })}

                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className={cn("grid w-full gap-4", `grid-cols-${columns} `)}>
                                {
                                    products.map((el) => (
                                        <ProductCard data={el} key={el.id} />
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
