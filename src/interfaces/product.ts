export interface IProduct {
    id?: number;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    discount: number;
    category: string;
    originalPrice: number;
    description: string;
}