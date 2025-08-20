import { HomeCarousel } from '@/components/home/HomeCarousel';
import { HomePage } from '@/lib/lang';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ComponentProps } from 'react';

type HomeProps = {
    categories: {
        category: {
            slug: string,
            name: string,
            url: string,
        },
        thumbnail: string
    }[],

    products: string[]
} & ComponentProps<'div'>

export default function Home({ categories, products }: HomeProps) {
    const titlePart = HomePage.Hero.title.split('/');
    const subtitlePart = HomePage.Hero.subtitle.split('Loremipsum ');

    console.log(categories[0]);

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
                    <Link href={categories[0].category.url} className='w-full flex flex-col items-center gap-4 p-4 bg-[#F3F5F7]'>
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
                                <Link href={el.category.url} className='w-full flex items-center gap-4 p-4 md:p-8 bg-[#F3F5F7]'>
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
            </div>

        </>
    );
}


