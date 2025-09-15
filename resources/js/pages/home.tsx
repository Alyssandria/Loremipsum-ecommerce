import { HomeCarousel } from '@/components/home/HomeCarousel';
import { ProductCard } from '@/components/products/ProductCard';
import { CartContext } from '@/context/cartsContext';
import { HomePage } from '@/lib/lang';
import { fetchWithHeaders } from '@/lib/utils';
import { Product, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight, Lock, LucidePhoneCall, TruckIcon, Wallet2Icon } from 'lucide-react';
import { ComponentProps, useContext, useEffect, useState } from 'react';

type HomeProps = {
    categories: {
        category: {
            slug: string,
            name: string,
            url: string,
        },
        thumbnail: string
    }[],

    products: Product[]
} & ComponentProps<'div'>

export default function Home({ categories, products }: HomeProps) {
    const { auth } = usePage<SharedData>().props;
    const titlePart = HomePage.Hero.title.split('/');
    const subtitlePart = HomePage.Hero.subtitle.split('Loremipsum ');
    const [carts, setCarts] = useState<null | Product[]>(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchWithHeaders(route("carts.json"));
            if (!response.ok) {
                // HANDLE ERRORS
                console.log(response);
            }
            const json = await response.json();

            setCarts(json);
            console.log(json);
        }


        if (!auth.user || !auth.carts?.length) {
            setCarts([]);
        } else {
            fetchData();
        }
    }, [])
    return (
        <>
            <Head title="Home" />

            <div className='min-h-screen space-y-12'>
                <section className="flex flex-col gap-6 md:gap-10">
                    <HomeCarousel />
                    <div className='flex flex-col gap-4 sm:items-center sm:flex-row'>
                        <h1 className='font-bold text-4xl sm:w-4/5 lg:text-7xl xl:text-8xl'>
                            <span className='flex'>{titlePart[0]}/</span>
                            <span>
                                {titlePart[1]}
                            </span>

                        </h1>
                        <p className='lg:text-xl'>
                            <span className='font-bold'>{HomePage.Navigation.logo}</span>
                            {' '}
                            {subtitlePart[1]}
                        </p>
                    </div>
                </section>

                <section className='flex flex-col gap-4 md:flex-row'>
                    <Link href={route("product.index", { category: categories[0].category.slug })} className='w-full flex flex-col items-center gap-4 p-4 bg-[#F3F5F7]'>
                        <span className='self-start block text-4xl font-medium'>{categories[0].category.name}</span>
                        <span className='self-start flex gap-2 w-fit border-b-2'>
                            Shop Now
                            <ArrowRight className='w-4' />
                        </span>
                        <img src={categories[0].thumbnail} />
                    </Link>


                    <div className='flex flex-col gap-4'>
                        {categories.map((el, i) => {
                            if (i === 0) {
                                return null
                            }
                            return (
                                <Link href={route("product.index", { category: el.category.slug })} className='w-full flex items-center gap-4 p-4 md:p-8 bg-[#F3F5F7]' key={el.category.name}>
                                    <div className='self-end'>
                                        <span className='self-start block font-medium text-xl'>{el.category.name}</span>
                                        <span className='self-start flex font-medium text-xs gap-2 w-fit border-b-2'>
                                            Shop Now
                                            <ArrowRight className='w-4' />
                                        </span>
                                    </div>
                                    <div className='w-4/5'>
                                        <img src={el.thumbnail} className='w-full' />
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                <section className='w-full grid grid-cols-2 gap-8'>

                    <h2 className='font-bold text-4xl sm:w-4/5 lg:text-7xl xl:text-8xl'>{HomePage.Arrivals.title}</h2>

                    <div className='w-full flex gap-4 overflow-x-scroll col-span-2 snap-x snap-mandatory md:gap-8'>
                        {products.map(el => {
                            return (
                                <ProductCard data={el} className='w-[70%] snap-center shrink-0 md:shrink' />
                            )
                        })}
                    </div>

                    <div className='row-start-3 w-max md:place-self-end md:col-start-2 md:row-start-1'>
                        <Link href={route("product.index")} className='md:text-lg flex gap-2 border-b'>
                            {HomePage.Arrivals.cta.content}
                            <ArrowRight />
                        </Link>
                    </div>
                </section>

                <section className='grid grid-cols-2 lg:flex gap-4 md:gap-8 justify-between'>
                    <div className='bg-[#F3F5F7] w-full flex flex-col justify-center p-4 py-8 md:p-12 gap-4'>
                        <TruckIcon className='size-12' />
                        <p className='text-lg md:text-xl font-bold'>{HomePage.Features.Shipping.title}</p>
                        <p className='text-muted-[#6C7275]'>{HomePage.Features.Shipping.subtitle}</p>
                    </div>

                    <div className='bg-[#F3F5F7] w-full flex flex-col justify-center p-4 md:p-12 gap-4'>
                        <Wallet2Icon className='size-12' />
                        <p className='text-lg md:text-xl font-bold'>{HomePage.Features.Money.title}</p>
                        <p className='text-muted-[#6C7275]'>{HomePage.Features.Money.subtitle}</p>
                    </div>
                    <div className='bg-[#F3F5F7] w-full flex flex-col justify-center p-4 md:p-12 gap-4'>
                        <Lock className='size-12' />
                        <p className='text-lg md:text-xl font-bold'>{HomePage.Features.Secure.title}</p>
                        <p className='text-muted-[#6C7275]'>{HomePage.Features.Secure.subtitle}</p>
                    </div>

                    <div className='bg-[#F3F5F7] w-full flex flex-col justify-center p-4 md:p-12 gap-4'>
                        <LucidePhoneCall className='size-12' />
                        <p className='text-lg md:text-xl font-bold'>{HomePage.Features.Support.title}</p>
                        <p className='text-muted-[#6C7275]'>{HomePage.Features.Support.subtitle}</p>
                    </div>
                </section>

            </div>

        </>
    );
}


