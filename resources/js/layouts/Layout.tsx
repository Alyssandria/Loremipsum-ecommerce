import { Carts } from "@/components/carts";
import { SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { ComponentProps } from "react";

export default function Layout({ children }: ComponentProps<"div">) {
    const { auth } = usePage<SharedData>().props;
    return (
        <div className="w-full bg-white text-secondary-foreground dark:bg-secondary">
            <header className="w-full p-4">
                <nav className="flex items-center justify-end gap-4">
                    <Link
                        href={route('product.index')}
                        className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                    >
                        Shop
                    </Link>
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={route('register')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>

                    )}
                    <Carts />
                </nav>
            </header>
            <main className="w-full bg-primary text-secondary dark:bg-secondary dark:text-primary-foreground">
                {children}
            </main>
        </div>

    )
}
