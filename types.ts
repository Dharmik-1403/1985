
export enum Category {
  HOODIES = 'Hoodies',
  SHOES = 'Shoes',
  SHIRTS = 'Shirts',
  TSHIRTS = 'T-Shirts',
  JEANS = 'Jeans'
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  description: string;
  imageUrl: string;
  isAnime?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  search: string;
  brands: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string; // Base64 URL
}

export type OrderStatus = 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export const BRANDS = {
  SHOES: ['Nike Air Jordan', 'Nike Air Force', 'Adidas', 'Reebok', 'Campus', 'Puma'],
  HOODIES: ['Nike', 'Adidas', 'Puma', 'Gap', 'H&M', 'United Colors of Benetton', 'Anime Style'],
  SHIRTS: ['Raymond', 'Peter England', 'Allen Solly', 'Park Avenue'],
  TSHIRTS: ['Anime Oversize', 'Classic Fit', 'Streetwear'],
  JEANS: ['Levis', 'Pepe', 'Spykar', 'Diesel', 'Wrangler']
};
