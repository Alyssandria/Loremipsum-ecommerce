import { CartItem } from "@/components/cartItem";
import { CartSteps } from "@/components/checkouts/cartSteps";
import { CheckoutField } from "@/components/checkouts/checkoutField";
import { CheckoutLabel } from "@/components/checkouts/checkoutLabel";
import InputError from "@/components/input-error";
import { QuantityHandler } from "@/components/quantity-handler";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatPrice } from "@/lib/utils";
import { CartItemType, Contacts, SharedData, Shipping } from "@/types";
import { useForm, usePage } from "@inertiajs/react";
import { LoaderCircleIcon } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Legend } from "@headlessui/react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

type CheckoutProps = {
    contacts: Contacts[],
    shipping: Shipping[],
    items: CartItemType[]
}

export default function({ items, shipping, contacts, }: CheckoutProps) {
    const { auth } = usePage<SharedData>().props;
    const [ids, setIds] = useState<number[]>(items.map((el) => el.product.id));
    const [isLoading, setisLoading] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemType[]>(items);
    const [subTotal, setsubTotal] = useState(0);

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

    useEffect(() => {
        window.history.replaceState(null, "", route("checkout.show", { ids: cartItems.map(el => el.product.id) }));

        let total = 0;
        cartItems.forEach((el) => {
            total += (el.product.price * el.quantity);
        });

        setsubTotal(total);
    }, [cartItems]);

    useEffect(() => {
        setCartItems(items);
        setisLoading(false);
    }, [items])

    console.log(subTotal);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = ids.map(id => `ids[]=${id}`).join('&');
        post(`payments/paypal?${query}`);
    }

    return (
        <div className="w-full space-y-12">
            <div className="">
                <h1 className="text-center text-3xl md:text-5xl font-bold">Checkout</h1>
                <CartSteps current={2} />
            </div>
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="grid lg:grid-cols-2 gap-8 w-full"
                method="POST"
            >
                <div className="w-full space-y-8">
                    <CheckoutField>
                        <Legend className="text-lg font-bold">Contacts Information</Legend>
                        {!contacts.length ?
                            <div>
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
                            </div>
                            :
                            <RadioGroup
                                defaultValue={`${data.contact_id}`}
                                onValueChange={(value) => setData('contact_id', Number(value))}
                            >
                                {contacts.map(el => {
                                    return (
                                        <div className="flex items-center space-x-2 border p-4 rounded-2xl">
                                            <RadioGroupItem
                                                className="self-start"
                                                value={`${el.id}`}
                                                id={`${el.id}`}
                                            />
                                            <Label htmlFor={`${el.id}`}>
                                                <div className="space-y-2">
                                                    <span className="block text-black text-lg">{`${el.last_name}, ${el.first_name}`}</span>
                                                    <div className="space-y-1">
                                                        <span className="block text-muted-foreground">{el.email}</span>
                                                        <span className="block text-muted-foreground">{el.phone}</span>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        }
                    </CheckoutField >

                    <CheckoutField>
                        <Legend className="text-lg font-bold">Shipping Information</Legend>
                        {!shipping.length ?
                            <div>
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
                            </div>
                            :
                            <RadioGroup
                                defaultValue={`${data.shipping_id}`}
                                onValueChange={(value) => setData('shipping_id', Number(value))}
                            >
                                {shipping.map(el => {
                                    return (
                                        <div className="flex items-center space-x-2 border p-4 rounded-2xl">
                                            <RadioGroupItem
                                                className="self-start"
                                                value={`${el.id}`}
                                                id={`${el.id}`}
                                            />
                                            <Label htmlFor={`${el.id}`}>
                                                <div className="space-y-2">
                                                    <span className="block text-black text-lg">{`${el.street}`}</span>
                                                    <div className="space-y-1">
                                                        <span className="block text-muted-foreground">{el.state}</span>
                                                        <span className="block text-muted-foreground">{el.country}</span>
                                                    </div>
                                                </div>
                                            </Label>
                                        </div>
                                    )
                                })}
                            </RadioGroup>
                        }
                    </CheckoutField >
                    <CheckoutField>
                        <Legend className="text-lg font-bold">Payment Method</Legend>
                        <div className="border flex p-4 rounded-lg gap-3 items-center ">
                            <div className="size-4 border rounded-full flex items-center justify-center">
                                <div className="size-2 border bg-black rounded-full" />
                            </div>
                            <Label className="font-bold">Pay with Payapal</Label>
                        </div>
                    </CheckoutField >
                </div>

                <div className="space-y-8">
                    <CheckoutField>
                        <Legend className="text-lg font-bold">Order Summary</Legend>
                        <div className="space-y-8 max-h-[400px] overflow-auto p-8">
                            {cartItems.map((el) => {
                                return (
                                    <CartItem item={el} onQuantityChange={
                                        () => {
                                        }
                                    }>
                                        <CartItem.Content>
                                            <CartItem.Title />
                                            <CartItem.Category />
                                            <CartItem.Price />
                                            <CartItem.RemoveButton
                                                type="button"
                                                handleRemove={() => {
                                                    setCartItems(prev => prev.filter(x => x.product.id !== el.product.id));
                                                }}
                                                className={
                                                    cn(
                                                        "md:row-start-3",
                                                    )}
                                            />
                                            <CartItem.Image src={el.product.thumbnail} />
                                            <QuantityHandler
                                                className="col-start-2 max-md:col-span-2 row-start-3 flex items-center justify-between px-2 py-1 border border-[#6C7275] rounded-lg"
                                                quantity={el.quantity}
                                                productID={el.product.id}
                                                onQuantityChange={() => {
                                                    setisLoading(true);
                                                }}
                                            />
                                        </CartItem.Content>
                                    </CartItem>
                                )
                            })}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="block text-secondary/60 font-medium">Subtotal</span>
                                <span className="block font-bold">
                                    {isLoading ?
                                        <Skeleton className="h-5 w-20" />
                                        :
                                        formatPrice(subTotal)
                                    }
                                </span>
                            </div>
                            <Separator />
                        </div>
                        <div className="flex justify-between">
                            <span className="block text-xl font-bold">Total</span>
                            <span className="block font-bold">{isLoading ? <Skeleton className="h-5 w-20" /> : formatPrice(subTotal)}</span>
                        </div>
                    </CheckoutField >
                </div>
                <Button className="flex w-full p-4">{processing ? <LoaderCircleIcon /> : "Place Order"}</Button>
            </form>
        </div>
    )

}
