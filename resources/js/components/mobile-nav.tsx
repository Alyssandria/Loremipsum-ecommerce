import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { cn } from "@/lib/utils"

export const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger className="cursor-pointer flex gap-2 items-center">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-6 overflow-auto scroll-smooth">
                <SheetHeader>
                    <SheetTitle>Carts</SheetTitle>
                </SheetHeader>
                <div className={cn("flex flex-col gap-3")}>

                </div>
            </SheetContent>
        </Sheet >
    )
}
