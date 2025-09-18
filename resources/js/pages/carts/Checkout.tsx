import { CartItem } from "@/components/cartItem";
import { CheckoutField } from "@/components/checkouts/checkoutField";
import { CheckoutLabel } from "@/components/checkouts/checkoutLabel";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contacts, Product, SharedData, Shipping } from "@/types";
import { Legend } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { LoaderCircleIcon } from "lucide-react";
import { FormEvent, useState } from "react";

type CheckoutProps = {
    contacts: Contacts[],
    shipping: Shipping[],
    items: Product[]
}

export default function({ items, shipping, contacts, }: CheckoutProps) {
    const { auth } = usePage<SharedData>().props;
    const [ids, setIds] = useState<number[]>([...items.map((el) => el.id)]);
    console.log(items);

    const { data, setData, post, errors, processing } = useForm({
        contact_id: contacts.length ? contacts[0].id : null,
        shipping_id: shipping.length ? shipping[0].id : null,
        street: '',
        country: '',
        city: '',
        state: '',
        zip: '',
        first_name: auth.user ? auth.user.first_name : '',
        last_name: auth.user ? auth.user.last_name : '',
        phone: '',
        email: auth.user ? auth.user.email : '',
    });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = ids.map(id => `ids[]=${id}`).join('&');
        post(`payments/paypal?${query}`);
    }
    return (
        <div>
            Hello CHeckout
            <form onSubmit={(e) => handleSubmit(e)} method="POST">
                {!contacts.length ?
                    <CheckoutField>
                        <Legend className="text-lg font-bold">Contacts Information</Legend>
                        <div className="flex gap-2">
                            <div className="space-y-2">
                                <CheckoutLabel htmlFor="first_name">First Name</CheckoutLabel>
                                <Input
                                    id="first_name"
                                    name="first_name"
                                    placeholder="First Name"
                                    className="block"
                                    value={data.first_name}
                                    onChange={(e) => setData('first_name', e.target.value)}
                                />
                                <InputError message={errors.first_name} />
                            </div>
                            <div className="space-y-2">
                                <CheckoutLabel htmlFor="last_name">Last Name</CheckoutLabel>
                                <Input
                                    id="last_name"
                                    name="last_name"
                                    placeholder="Last Name"
                                    value={data.last_name}
                                    onChange={(e) => setData('last_name', e.target.value)}
                                />
                                <InputError message={errors.last_name} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <CheckoutLabel htmlFor="phone">Phone Number</CheckoutLabel>
                            <Input
                                id="phone"
                                name="phone"
                                placeholder="Phone Number"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="space-y-2">
                            <CheckoutLabel htmlFor="email">Email</CheckoutLabel>
                            <Input
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>
                    </CheckoutField >
                    :
                    <div>
                    </div>
                }

                {!shipping.length ?
                    <CheckoutField>
                        <Legend className="text-lg font-bold">Shipping Information</Legend>
                        <div className="space-y-2">
                            <CheckoutLabel htmlFor="street">Street Address</CheckoutLabel>
                            <Input
                                id="street"
                                name="street"
                                placeholder="Street Address"
                                className="block"
                                value={data.street}
                                onChange={(e) => setData('street', e.target.value)}
                            />
                            <InputError message={errors.street} />
                        </div>
                        <div className="space-y-2">
                            <CheckoutLabel htmlFor="country">Country</CheckoutLabel>
                            <Input
                                id="country"
                                name="country"
                                placeholder="Country"
                                value={data.country}
                                onChange={(e) => setData('country', e.target.value)}
                            />
                            <InputError message={errors.country} />
                        </div>

                        <div className="space-y-2">
                            <CheckoutLabel htmlFor="city">Town/City</CheckoutLabel>
                            <Input
                                id="city"
                                name="city"
                                placeholder="Town/City"
                                value={data.city}
                                onChange={(e) => setData('city', e.target.value)}
                            />
                            <InputError message={errors.city} />
                        </div>

                        <div className="flex gap-2">
                            <div className="space-y-2">
                                <CheckoutLabel htmlFor="state">State</CheckoutLabel>
                                <Input
                                    id="state"
                                    name="state"
                                    placeholder="state"
                                    value={data.state}
                                    onChange={(e) => setData('state', e.target.value)}
                                />
                                <InputError message={errors.state} />
                            </div>
                            <div className="space-y-2">
                                <CheckoutLabel htmlFor="zip">Zip</CheckoutLabel>
                                <Input
                                    id="zip"
                                    name="zip"
                                    placeholder="zip"
                                    value={data.zip}
                                    onChange={(e) => setData('zip', e.target.value)}
                                />
                                <InputError message={errors.zip} />
                            </div>
                        </div>
                    </CheckoutField >
                    :
                    <div></div>
                }

                <CheckoutField>
                    <Legend className="text-lg font-bold">Payment Method</Legend>
                    <div className="border flex p-4 rounded-lg gap-3 items-center ">
                        <div className="size-4 border rounded-full flex items-center justify-center">

                            <div className="size-2 border bg-black rounded-full" />
                        </div>
                        <Label className="font-bold">Pay with Payapal</Label>
                    </div>
                </CheckoutField >


                <CheckoutField>
                    <Legend className="text-lg font-bold">Order Summary</Legend>
                    <div>
                        {items.map((el) => {
                            return (
                                <CartItem item={el} showCheckout={false} />
                            )
                        })}
                    </div>
                </CheckoutField >

                <Button className="flex w-full p-4">{processing ? <LoaderCircleIcon /> : "Place Order"}</Button>
            </form>
        </div>

    )

}
