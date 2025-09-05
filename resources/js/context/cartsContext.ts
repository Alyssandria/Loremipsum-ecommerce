import { Product } from "@/types";
import { createContext } from "react";

export const CartContext = createContext<null | Product[]>(null);
