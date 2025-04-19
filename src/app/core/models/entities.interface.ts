export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  createdAt?: string;
  enabled?: boolean;
  category: Category
}

export interface Category {
  id?: number;
  name?: string;
  enabled?: boolean;
}

export interface Color {
  id?: number;
  name?: string;
  code?: string;
  enabled?: boolean;
}

export interface Size {
  id?: number;
  value?: string;
  enabled?: boolean;
}

export interface ImageProduct {
  id?: number;
  url?: string;
}

export interface Inventory {
  id?: number;
  stock?: number;
  enabled?: boolean;
  product: Product;
  size: Size;
  color: Color;
  imageProducts: ImageProduct[]
}