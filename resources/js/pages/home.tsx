import { HomeCarousel } from '@/components/home/HomeCarousel';
import { HomePage } from '@/lib/lang';
import { Head } from '@inertiajs/react';

export default function Home() {
    const titlePart = HomePage.Hero.title.split('/');
    const subtitlePart = HomePage.Hero.subtitle.split('Loremipsum ');
    return (
        <>
            <Head title="Home" />

            <section className="flex min-h-screen flex-col gap-6 md:gap-10">
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
        </>
    );
}


