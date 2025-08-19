import {
    Carousel,
    CarouselContent,
    type CarouselApi,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

import car1 from "@/assets/carousel-h-1.jpg"
import car2 from "@/assets/carousel-h-2.jpg"
import car3 from "@/assets/carousel-h-3.jpg"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export const HomeCarousel = () => {

    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        });

    }, [api])


    return (
        <Carousel setApi={setApi}>
            <CarouselContent className="w-full max-h-[600px]">
                <CarouselItem className="size-full max-h-[677px] overflow-clip"><img src={car1} className="size-full md:object-cover" /></CarouselItem>
                <CarouselItem><img src={car2} className="size-full md:object-cover" /></CarouselItem>
                <CarouselItem><img src={car3} className="size-full md:object-cover" /></CarouselItem>
            </CarouselContent>
            <div className="flex absolute left-1/2 translate-x-[-60%] bottom-3 md:bottom-5 gap-4">
                {Array.from({ length: 3 }).fill(0).map((_, i) => {
                    return (
                        <div className={cn("size-3 rounded-full bg-white transition-all ease-in-out", current === i + 1 ? 'w-12' : '')} key={i} />
                    );
                })}
            </div>
            <CarouselPrevious className="max-md:hidden size-12 border-0 bg-white text-black top-1/2 left-4" />
            <CarouselNext className="max-md:hidden size-12 top-1/2 border-0 right-8 bg-white text-black" />
        </Carousel>
    )
}
