import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCategory(category: string) {
    if (!category) return;

    const s = category.split("-");
    return category.search(/-/) !== -1
        ? `${s[0].charAt(0).toUpperCase()}${s[0].slice(1)} ${s[1].charAt(0).toUpperCase()}${s[1].slice(1)}`
        : `${category[0].toUpperCase()}${category.slice(1)}`
}

