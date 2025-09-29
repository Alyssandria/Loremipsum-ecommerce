import { fetchWithHeaders } from "@/lib/utils";
import { router } from "@inertiajs/react";
import { act, useEffect, useRef, useState } from "react";

export const useUpdateQuantity = (q: number, productID: number, opts?: {
    onQuantityChange?: () => void
}) => {
    const [quantity, setQuantity] = useState<number>(q);
    const hasLoaded = useRef<boolean>(false);

    useEffect(() => {
        if (!hasLoaded.current) {
            hasLoaded.current = true;
            return;
        }

        opts?.onQuantityChange?.();

        const abortController = new AbortController();

        const updateQuantity = async () => {
            try {
                const response = await fetchWithHeaders(route("cart.update", { productID, q: quantity }), "POST", abortController.signal)

                if (!response.ok) {
                    // handle error
                    console.log(response);
                }

                router.reload({
                    only: ["items"],
                })
            } catch (err: any) {
                if (err.name === "AbortError") {
                    console.log("Aborting Error");
                }
            }
        }

        const debounce = setTimeout(updateQuantity, 500);

        return () => {
            clearTimeout(debounce);
            abortController.abort();
        }

    }, [quantity]);

    return { quantity, setQuantity };
}
