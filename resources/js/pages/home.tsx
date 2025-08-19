import { HomeCarousel } from '@/components/home/HomeCarousel';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <>
            <Head title="Home" />

            <div className="flex min-h-screen flex-col items-center">
                <HomeCarousel />
            </div>
        </>
    );
}


