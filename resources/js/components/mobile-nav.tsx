import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { cn } from "@/lib/utils"
import { NavLink } from "@/layouts/Layout"
import { HomePage } from "@/lib/lang"
import { useState } from "react"

export const MobileNav = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="cursor-pointer flex gap-2 items-center block lg:hidden">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-6 overflow-auto scroll-smooth">
                <SheetHeader>
                    <SheetTitle className="text-lg">{HomePage.Navigation.logo}</SheetTitle>
                </SheetHeader>
                <div className={cn("flex flex-col gap-3")}>

                    <NavLink
                        routeName="home"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        {HomePage.Navigation.home}
                    </NavLink>
                    <NavLink
                        routeName="product.index"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        {HomePage.Navigation.shop}
                    </NavLink>
                    <NavLink
                        routeName="contact"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        {HomePage.Navigation.contact}
                    </NavLink>

                </div>
            </SheetContent>
        </Sheet >
    )
}
