import { Carts } from "@/components/carts";
import { MobileNav } from "@/components/mobile-nav";
import { HomePage } from "@/lib/lang";
import { cn } from "@/lib/utils";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import { ComponentProps, ReactNode } from "react";
import marketing from "@/assets/marketing.jpg"
import { Separator } from "@/components/ui/separator";

const BannerIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="w-6"
        fill="none"
    >
        <path
            fill="#141718"
            d="m21.018 14.836-.245.708.245-.708Zm0-5.672.245.71-.245-.71ZM2.982 14.836l.245.708-.245-.708Zm0-5.672-.245.71.245-.71Zm12.548.366a.75.75 0 0 0-1.06-1.06l1.06 1.06Zm-7.06 4.94a.75.75 0 1 0 1.06 1.06l-1.06-1.06ZM6 20.25A3.25 3.25 0 0 1 2.75 17h-1.5A4.75 4.75 0 0 0 6 21.75v-1.5ZM21.25 17A3.25 3.25 0 0 1 18 20.25v1.5A4.75 4.75 0 0 0 22.75 17h-1.5ZM18 3.75A3.25 3.25 0 0 1 21.25 7h1.5A4.75 4.75 0 0 0 18 2.25v1.5ZM6 2.25A4.75 4.75 0 0 0 1.25 7h1.5A3.25 3.25 0 0 1 6 3.75v-1.5Zm15.264 11.877A2.251 2.251 0 0 1 19.75 12h-1.5a3.751 3.751 0 0 0 2.523 3.544l.49-1.417ZM19.75 12c0-.984.631-1.822 1.514-2.127l-.491-1.417A3.751 3.751 0 0 0 18.25 12h1.5Zm-15.5 0c0 .984-.632 1.822-1.513 2.127l.49 1.417A3.751 3.751 0 0 0 5.75 12h-1.5ZM2.737 9.873A2.251 2.251 0 0 1 4.25 12h1.5a3.751 3.751 0 0 0-2.523-3.544l-.49 1.417ZM22.75 8V7h-1.5v1h1.5Zm-1.5 8v1h1.5v-1h-1.5Zm-20 0v1h1.5v-1h-1.5Zm1.5-8V7h-1.5v1h1.5ZM18 20.25H6v1.5h12v-1.5Zm0-18H6v1.5h12v-1.5ZM2.737 14.127c-.68.235-1.487.87-1.487 1.873h1.5c0-.056.02-.13.102-.219a.92.92 0 0 1 .375-.237l-.49-1.417Zm18.527-4.254c.678-.235 1.486-.87 1.486-1.873h-1.5c0 .056-.02.13-.102.219a.921.921 0 0 1-.375.237l.49 1.417ZM3.227 8.456a.921.921 0 0 1-.375-.237C2.77 8.129 2.75 8.056 2.75 8h-1.5c0 1.002.808 1.638 1.487 1.873l.49-1.417Zm17.546 7.088a.92.92 0 0 1 .375.237c.081.09.102.163.102.219h1.5c0-1.002-.808-1.638-1.486-1.873l-.491 1.417ZM9.25 9a.25.25 0 0 1-.25.25v1.5A1.75 1.75 0 0 0 10.75 9h-1.5ZM9 9.25A.25.25 0 0 1 8.75 9h-1.5c0 .966.784 1.75 1.75 1.75v-1.5ZM8.75 9A.25.25 0 0 1 9 8.75v-1.5A1.75 1.75 0 0 0 7.25 9h1.5ZM9 8.75a.25.25 0 0 1 .25.25h1.5A1.75 1.75 0 0 0 9 7.25v1.5ZM15.25 15a.25.25 0 0 1-.25.25v1.5A1.75 1.75 0 0 0 16.75 15h-1.5Zm-.25.25a.25.25 0 0 1-.25-.25h-1.5c0 .966.784 1.75 1.75 1.75v-1.5Zm-.25-.25a.25.25 0 0 1 .25-.25v-1.5A1.75 1.75 0 0 0 13.25 15h1.5Zm.25-.25a.25.25 0 0 1 .25.25h1.5A1.75 1.75 0 0 0 15 13.25v1.5Zm-.53-6.28-6 6 1.06 1.06 6-6-1.06-1.06Z"
        />
    </svg>
)

export const NavLink = ({ routeName, className, children, onClick }: { onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void, routeName: string, className?: string, children: ReactNode }) => {
    return (
        <Link href={route(routeName)} onClick={(e) => onClick && onClick(e)} className={cn("max-md:py-4 max-md:border-b", route().current(routeName) ? "font-bold" : "font-normal", className)}>
            {children}
        </Link>
    )
}
export default function Layout({ children }: ComponentProps<"div">) {
    const { auth } = usePage<SharedData>().props;
    return (
        <div className="w-full bg-white text-primary-foreground overflow-x-clip">
            <div className="w-full bg-[#F3F5F7] p-2 items-center justify-center gap-2 flex">
                <BannerIcon />
                <p className="max-sm:text-xs text-[#343839] font-bold">{HomePage.Banner.content}</p>
                <Link href={route('product.index')} className="max-md:hidden flex items-center gap-2 font-bold underline text-[#377DFF]">
                    {HomePage.Banner.cta.content}
                    <ArrowRightIcon className="w-4 stroke-[#377DFF]" />
                </Link>
            </div>
            <header className="w-full p-6 md:px-12">
                <nav className="flex items-center justify-between gap-4">
                    <div className="flex gap-2 items-center">
                        <MobileNav />
                        <Link
                            href={route('home')}
                            className="font-bold text-lg"
                        >
                            {HomePage.Navigation.logo}
                        </Link>
                    </div>
                    <div className="hidden  gap-8 md:flex">
                        <NavLink
                            routeName="home"
                        >
                            {HomePage.Navigation.home}
                        </NavLink>
                        <NavLink
                            routeName="product.index"
                        >
                            {HomePage.Navigation.shop}
                        </NavLink>
                        <NavLink
                            routeName="contact"
                        >
                            {HomePage.Navigation.contact}
                        </NavLink>
                    </div>
                    {auth.user ? (
                        <Carts />
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                            >
                                Log in
                            </Link>
                        </>
                    )}
                </nav>
            </header>
            <main className="w-full bg-white px-6 md:px-12">
                {children}
            </main>

            {
                window.location.pathname === '/' &&
                <section className='flex flex-col bg-[#F3F5F7] mt-12 lg:flex-row'>
                    <div className="size-full">
                        <img src={marketing} alt="Marketing Image" className="size-full object-fill" />
                    </div>
                    <div className="w-full p-6 md:px-20 md:py-12 flex gap-4 flex-col md:justify-center md:text-center md:items-center lg:text-left lg:items-start">
                        <p className="font-bold text-[#377DFF]">{HomePage.Marketing.discount}</p>
                        <h2 className="w-full font-bold text-2xl lg:text-4xl">{HomePage.Marketing.title}</h2>
                        <p className="lg:text-xl lg:w-4/5">{HomePage.Marketing.subtitle}</p>
                        <Link href={route('product.index')} className='flex flex-nowrap border-b w-max font-medium gap-2'>
                            {HomePage.Marketing.cta.content}
                            <ArrowRight className="w-4" />
                        </Link>
                    </div>
                </section>
            }
            <footer className="bg-[#232627] text-white gap-6 p-6 grid place-items-center md:place-items-start md:grid-cols-8 md:p-12 my-20">
                <Link href={route('home')} className="text-xl font-bold md:text-sm">{HomePage.Navigation.logo}</Link>
                <div className="flex flex-col items-center justify-center gap-4 md:col-start-6 w-full md:col-span-full md:flex-row md:justify-end md:items-start">
                    <Link href={route('home')} className="">{HomePage.Navigation.home}</Link>
                    <Link href={route('home')} className="">{HomePage.Navigation.shop}</Link>
                    <Link href={route('home')} className="">{HomePage.Navigation.contact}</Link>
                </div>
                <Separator className="bg-muted-foreground w-full col-span-full" />
                <div className="w-full gap-4 md:flex md:col-span-full md:flex-row-reverse md:flex-nowrap">
                    <div className="flex justify-around w-full md:justify-start">
                        <p className="font-bold text-xs">
                            Privacy Policy
                        </p>
                        <p className="font-bold text-xs">
                            Terms of use
                        </p>
                    </div>
                    <p className="text-xs text-center md:text-left">
                        Copyright © 2025 Loremipsum. All rights reserved
                    </p>
                </div>

            </footer>
        </div>

    )
}
