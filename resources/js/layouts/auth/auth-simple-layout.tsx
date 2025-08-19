import AppLogoIcon from '@/components/app-logo-icon';
import { HomePage } from '@/lib/lang';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import authHeroMobile from "@/assets/authHeroMobile.png"
import authHero from "@/assets/authHero.png"

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className='flex flex-col lg:flex-row justify-around'>
            <div className='h-full lg:w-[40%]'>
                <img src={authHeroMobile} className='size-full block md:hidden' />
                <img src={authHero} className='hidden size-full md:block' />
            </div>
            <div className="flex min-h-svh flex-col items-center bg-white justify-center gap-6 p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <Link href={route('home')} className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex text-4xl w-9 items-center justify-center rounded-md">{HomePage.Navigation.logo}</div>
                                <span className="sr-only">{title}</span>
                            </Link>

                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">{title}</h1>
                                <p className="text-center text-sm text-muted-foreground">{description}</p>
                            </div>
                        </div>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
