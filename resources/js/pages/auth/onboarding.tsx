import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/layouts/auth-layout";
import { Head, useForm } from "@inertiajs/react";
import { LoaderCircle } from "lucide-react";
import { ComponentProps, FormEvent } from "react";

type OnboardingForm = {
    first_name: string,
    last_name: string,
    display_name: string,
    email: string,
}

export default function Onboarding({ email }: { email: string } & ComponentProps<'div'>) {
    const { data, setData, post, processing, errors } = useForm<Required<OnboardingForm>>({
        email,
        first_name: '',
        last_name: '',
        display_name: ''

    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post(route('onboarding.store'));
    };

    return (
        <AuthLayout title="Welcome to loremipsum!" description="Enter required details below">
            <Head title="Onboarding" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="first_name">First Name*</Label>
                        <Input
                            id="first_name"
                            required
                            tabIndex={1}
                            placeholder="First Name"
                            onChange={(e) => setData('first_name', e.target.value)}
                            value={data.first_name}
                        />
                        <InputError message={errors.first_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="last_name">Last Name*</Label>
                        <Input
                            id="last_name"
                            required
                            tabIndex={1}
                            placeholder="Last Name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            value={data.last_name}
                        />
                        <InputError message={errors.last_name} />
                    </div>


                    <div className="grid gap-2">
                        <Label htmlFor="display_name">Display Name*</Label>
                        <Input
                            id="display_name"
                            required
                            tabIndex={1}
                            placeholder="Display Name"
                            onChange={(e) => setData('display_name', e.target.value)}
                            value={data.display_name}
                        />
                        <InputError message={errors.display_name} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address*</Label>
                        <div className="cursor-not-allowed">
                            <Input
                                disabled
                                id="email"
                                type="email"
                                required
                                tabIndex={1}
                                autoComplete="email"
                                value={data.email}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                </div>

            </form>
        </AuthLayout>
    );
}

Onboarding.layout = (page: React.ReactNode) => page;
