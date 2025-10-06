import { CartSteps } from "@/components/checkouts/cartSteps";
import { formatPrice } from "@/lib/utils";
import { type Order, OrderItem, SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { LucidePartyPopper } from "lucide-react";
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
        <div className="flex w-1/2 justify-between">
            <span className="text-[#6C7275] font-medium">{title}{": "}</span>
            <span className="font-bold">{value}</span>
        </div>

    )
}
export default function Order({ order, orderItems }: TOrder) {
    const { flash } = usePage<SharedData>().props;
    console.log(order);
    console.log(orderItems);
    console.log(flash.error);
    return (
        <div>
            <div className="">
                <h1 className="text-center text-3xl md:text-5xl font-bold">Checkout</h1>
                <CartSteps current={3} />
            </div>

            <div className="shadow-2xl">
                <div>
                    <h2 className="flex items-center">
                        Thank You!
                        <LucidePartyPopper />
                    </h2>
                    <span className="block text-2xl font-bold">Your order has been recieved</span>
                </div>

                <div className="flex w-full justify-center gap-2">
                    {orderItems.map(el => {
                        return (
                            <div className="relative bg-[#F3F5F7]">
                                <img src={el.image} className="max-h-[100px]" />
                                <span className=" absolute top-[-15%] bg-black size-6 text-xs md:size-8 md:text-sm flex justify-center text-white items-center rounded-full right-[-15%]">{el.quantity}</span>
                            </div>
                        )
                    })}
                </div>

                <div>
                    <OrderDetail title="Order code" value={order.order_no} />
                    <OrderDetail title="Date" value={order.date} />
                    <OrderDetail title="Total" value={formatPrice(order.total)} />
                    <OrderDetail title="Payment Method" value={"Paypal"} />
                </div>

                <Link >Purchase History</Link>
            </div>
        </div>
    )
}
