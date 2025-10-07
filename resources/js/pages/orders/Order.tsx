import { CartSteps } from "@/components/checkouts/cartSteps";
import { PartyPopper } from "@/components/ui/partypopper";
import { formatPrice } from "@/lib/utils";
import { type Order, OrderItem, SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { Separator } from "@radix-ui/react-separator";
import { ComponentProps, ReactNode } from "react";

type TOrder = {
    order: Order,
    orderItems: OrderItem[]
} & ComponentProps<"div">

type OrderDetailProps = {
    title: ReactNode,
    value: ReactNode
};

const OrderDetail = ({ title, value }: OrderDetailProps) => {
    return (
        <div className="flex flex-col gap-2 md:gap-20 md:flex-row w-full justify-between">
            <span className="block text-[#6C7275] font-bold">{title}{": "}</span>
            <span className="block font-bold self-end">{value}</span>
            <Separator className="h-[2px] bg-[#E8ECEF] md:hidden" />
        </div>

    )
}

export default function Order({ order, orderItems }: TOrder) {
    return (
        <div className="w-full space-y-12">
            <div>
                <h1 className="text-center text-3xl md:text-5xl font-bold">Checkout</h1>
                <CartSteps current={3} />
            </div>

            <div className="w-full flex flex-col gap-10 md:items-center md:justify-center md:p-12 p-4 max-w-[740px] m-auto border border-[#E8ECEF] rounded-sm shadow-2xl">
                <div className="space-y-4">
                    <h2 className="flex text-[#6C7275] font-bold md:justify-center items-center">
                        <span className="block md:text-2xl">Thank You!</span>
                        <PartyPopper />
                    </h2>
                    <span className="block text-4xl md:text-5xl md:text-center font-bold">Your order has been recieved</span>
                </div>

                <div className="flex flex-wrap justify-center gap-8">
                    {orderItems.map(el => {
                        return (
                            <div className="relative bg-[#F3F5F7] ">
                                <img src={el.image} className="max-h-[100px] object-contain" />
                                <span className=" absolute top-[-15%] bg-black size-6 text-xs md:size-8 md:text-sm flex justify-center text-white items-center rounded-full right-[-15%]">{el.quantity}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="space-y-4">
                    <OrderDetail title="Order code" value={order.order_no} />
                    <OrderDetail title="Date" value={order.date} />
                    <OrderDetail title="Total" value={formatPrice(order.total)} />
                    <OrderDetail title="Payment Method" value={"Paypal"} />
                </div>

                <Link className="flex items-center justify-center text-white bg-black p-4 rounded-full md:w-1/2">Purchase History</Link>
            </div>
        </div>
    )
}
