import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Carts {
    product_id: number,
    cart_id: number,
    quantity: number
}

export interface Auth {
    user: User;
    carts: Carts[] | null;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    flash: {
        error?: {
            message: string
        }
    }
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    display_name: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

interface Dimensions {
    width: number;
    height: number;
    depth: number;
}

interface Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
}

interface Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    images: string[];
    thumbnail: string;
}

interface Contacts {
    id: number,
    first_name: string,
    last_name: string,
    phone: number,
    email: string,
    user_id: number
}

interface Shipping {
    street: string,
    id: number,
    country: string,
    zip: string,
    state: string,
    user_id: number
}
