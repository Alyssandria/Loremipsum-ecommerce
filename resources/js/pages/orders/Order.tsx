import { SharedData } from "@/types";
import { usePage } from "@inertiajs/react";

export default function Order({ order, orderItems }) {
    const { flash } = usePage<SharedData>().props;
    console.log(order);
    console.log(flash.error);
    return (
        <div>Hello From Orders</div>
    )
}
