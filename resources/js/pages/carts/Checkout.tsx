import { CheckoutField } from "@/components/checkouts/checkoutField";
import { CheckoutLabel } from "@/components/checkouts/checkoutLabel";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Contacts, Product, Shipping } from "@/types";
import { Legend } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";

type CheckoutProps = {
    contacts: Contacts[],
    shipping: Shipping[],
    items: Product[]

}

export default function({ items, shipping, contacts, }: CheckoutProps) {

    const { data, setData, errors, processing } = useForm({
        contact_id: !contacts.length ? null : contacts[0].id,
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
    });

    console.log(items);
    return (
        <div>
            Hello CHeckout
            <form>
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

                <Button className="flex w-full p-4">{processing ? <LoaderCircle /> : "Place Order"}</Button>
            </form>
        </div>

    )

}
